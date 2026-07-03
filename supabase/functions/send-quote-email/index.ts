import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

function escapeHtml(str: string | null | undefined): string {
  if (!str) return '';
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function getServiceLabel(serviceType: string | null | undefined, language: string): string {
  const type = serviceType || '';
  const isFr = language === 'fr';
  switch (type) {
    case 'repair':
      return isFr ? 'Réparation de roues fissurées' : 'Cracked wheel repair';
    case 'straightening':
      return isFr ? 'Redressement de jantes' : 'Wheel straightening';
    case 'powdercoat':
      return isFr ? 'Powder coat / Peinture cuite' : 'Powder coating';
    case 'paint':
      return isFr ? 'Peinture liquide' : 'Liquid paint';
    case 'cnc':
      return isFr ? 'Usinage numérique' : 'CNC machining';
    case 'other':
      return isFr ? 'Autre' : 'Other';
    default:
      return '—';
  }
}

function timingSafeEqual(a: string, b: string): boolean {
  if (a.length !== b.length) return false;
  let result = 0;
  for (let i = 0; i < a.length; i++) {
    result |= a.charCodeAt(i) ^ b.charCodeAt(i);
  }
  return result === 0;
}

// Accept either the env-var service-role key (could be sb_secret_ or JWT format)
// OR a valid service_role JWT. The webhook is configured with a JWT-format key
// while the runtime env var may hold the new sb_secret_ format, so both must pass.
function isValidServiceRoleToken(token: string, envKey: string): boolean {
  if (token.length === 0) return false;

  if (envKey.length > 0 && timingSafeEqual(token, envKey)) return true;

  if (token.startsWith('eyJ')) {
    const parts = token.split('.');
    if (parts.length === 3) {
      try {
        const payload = JSON.parse(atob(parts[1]));
        if (payload && payload.role === 'service_role') return true;
      } catch {
        return false;
      }
    }
  }

  return false;
}

Deno.serve(async (req) => {
  // CORS preflight
  if (req.method === 'OPTIONS') {
    return new Response(null, {
      status: 204,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'POST, OPTIONS',
        'Access-Control-Allow-Headers': 'authorization, content-type',
      },
    });
  }

  try {
    // Auth: validate bearer token against SUPABASE_SERVICE_ROLE_KEY
    const authHeader = req.headers.get('Authorization') || '';
    const expectedPrefix = 'Bearer ';
    const serviceRoleKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") || "";

    if (!authHeader.startsWith(expectedPrefix)) {
      return new Response(JSON.stringify({ error: 'unauthorized' }), {
        status: 401,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const token = authHeader.slice(expectedPrefix.length);
    if (!isValidServiceRoleToken(token, serviceRoleKey)) {
      return new Response(JSON.stringify({ error: 'unauthorized' }), {
        status: 401,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    // Parse webhook payload
    const payload = await req.json();
    const record = payload.record;

    if (!record) {
      return new Response(JSON.stringify({ error: 'missing_record' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    // Create Supabase client with service role
    const supabaseUrl = Deno.env.get("SUPABASE_URL") || "";
    const supabase = createClient(supabaseUrl, serviceRoleKey);

    // Generate signed URLs for photos
    const photoUrls: string[] = [];
    const photoPaths = record.photo_urls || [];
    for (const path of photoPaths) {
      try {
        const { data, error } = await supabase.storage
          .from('quote-photos')
          .createSignedUrl(path, 604800);
        if (error) {
          console.error('Signed URL error for path:', path, error);
          photoUrls.push(`(path: ${path})`);
        } else if (data?.signedUrl) {
          photoUrls.push(data.signedUrl);
        } else {
          photoUrls.push(`(path: ${path})`);
        }
      } catch (e) {
        console.error('Exception generating signed URL for path:', path, e);
        photoUrls.push(`(path: ${path})`);
      }
    }

    // Build email HTML
    const isFr = record.language === 'fr';
    const subject = isFr
      ? `Nouvelle demande de devis — ${escapeHtml(record.name)}`
      : `New quote request — ${escapeHtml(record.name)}`;

    const photoSection = photoUrls.length > 0
      ? photoUrls.map((url, i) => {
          if (url.startsWith('http')) {
            return `<a href="${url}">Photo ${i + 1}</a>`;
          }
          return `<span>${url}</span>`;
        }).join('<br>')
      : 'Aucune photo / No photos';

    const html = `
      <div style="max-width:600px;margin:0 auto;font-family:sans-serif;background:#0a0a0a;">

        <!-- Header -->
        <div style="background:#1a1a1a;border:1px solid #2a2a2a;border-bottom:3px solid #c9a84c;padding:24px;text-align:center;">
          <div style="font-size:22px;font-weight:bold;letter-spacing:3px;text-transform:uppercase;color:#ffffff;margin-bottom:4px;">
            EXACT <span style="color:#c9a84c;">WHEEL</span>
          </div>
          <div style="font-size:11px;letter-spacing:2px;text-transform:uppercase;color:#888;margin-top:8px;">
            ${isFr ? 'Réparation de roues en alliage — Montréal' : 'Alloy wheel repair — Montreal'}
          </div>
        </div>

        <!-- Title -->
        <div style="background:#1a1a1a;border:1px solid #2a2a2a;border-top:none;padding:24px;">
          <h2 style="margin:0 0 4px;color:#c9a84c;font-size:18px;text-transform:uppercase;letter-spacing:1px;">
            ${isFr ? 'Nouvelle demande de devis' : 'New quote request'}
          </h2>
          <p style="margin:0;color:#888;font-size:13px;">
            ${isFr ? 'Reçue le' : 'Received on'} ${new Date().toLocaleString(isFr ? 'fr-CA' : 'en-CA', { dateStyle: 'long', timeStyle: 'short' })}
          </p>
        </div>

        <!-- Customer Info -->
        <div style="background:#1a1a1a;border:1px solid #2a2a2a;border-top:none;padding:0;">
          <div style="padding:12px 24px;border-bottom:1px solid #2a2a2a;">
            <span style="font-size:11px;letter-spacing:2px;text-transform:uppercase;color:#c9a84c;font-weight:bold;">${isFr ? 'Client' : 'Customer'}</span>
          </div>
          <table style="width:100%;border-collapse:collapse;font-size:14px;color:#e0e0e0;">
            <tr>
              <td style="padding:10px 24px;width:120px;color:#888;">${isFr ? 'Nom' : 'Name'}</td>
              <td style="padding:10px 24px;font-weight:bold;">${escapeHtml(record.name)}</td>
            </tr>
            <tr style="background:#0f0f0f;">
              <td style="padding:10px 24px;color:#888;">Email</td>
              <td style="padding:10px 24px;"><a href="mailto:${escapeHtml(record.email)}" style="color:#c9a84c;text-decoration:none;">${escapeHtml(record.email)}</a></td>
            </tr>
            <tr>
              <td style="padding:10px 24px;color:#888;">${isFr ? 'Téléphone' : 'Phone'}</td>
              <td style="padding:10px 24px;">${escapeHtml(record.phone) || '—'}</td>
            </tr>
          </table>
        </div>

        <!-- Vehicle & Service -->
        <div style="background:#1a1a1a;border:1px solid #2a2a2a;border-top:none;padding:0;">
          <div style="padding:12px 24px;border-bottom:1px solid #2a2a2a;">
            <span style="font-size:11px;letter-spacing:2px;text-transform:uppercase;color:#c9a84c;font-weight:bold;">${isFr ? 'Véhicule & Service' : 'Vehicle & Service'}</span>
          </div>
          <table style="width:100%;border-collapse:collapse;font-size:14px;color:#e0e0e0;">
            <tr>
              <td style="padding:10px 24px;width:120px;color:#888;">${isFr ? 'Véhicule' : 'Vehicle'}</td>
              <td style="padding:10px 24px;">${escapeHtml(record.vehicle) || '—'}</td>
            </tr>
            <tr style="background:#0f0f0f;">
              <td style="padding:10px 24px;color:#888;">${isFr ? 'Dimension' : 'Wheel size'}</td>
              <td style="padding:10px 24px;">${escapeHtml(record.wheel_size) || '—'}</td>
            </tr>
            <tr>
              <td style="padding:10px 24px;color:#888;">${isFr ? 'Service' : 'Service'}</td>
              <td style="padding:10px 24px;">${getServiceLabel(record.service_type, record.language)}</td>
            </tr>
          </table>
        </div>

        <!-- Description -->
        <div style="background:#1a1a1a;border:1px solid #2a2a2a;border-top:none;padding:0;">
          <div style="padding:12px 24px;border-bottom:1px solid #2a2a2a;">
            <span style="font-size:11px;letter-spacing:2px;text-transform:uppercase;color:#c9a84c;font-weight:bold;">${isFr ? 'Description' : 'Description'}</span>
          </div>
          <div style="padding:16px 24px;font-size:14px;color:#e0e0e0;line-height:1.6;">
            ${escapeHtml(record.description)}
          </div>
        </div>

        <!-- Photos -->
        <div style="background:#1a1a1a;border:1px solid #2a2a2a;border-top:none;padding:0;">
          <div style="padding:12px 24px;border-bottom:1px solid #2a2a2a;">
            <span style="font-size:11px;letter-spacing:2px;text-transform:uppercase;color:#c9a84c;font-weight:bold;">${isFr ? 'Photos' : 'Photos'}${photoUrls.length > 0 ? ' (' + photoUrls.length + ')' : ''}</span>
          </div>
          <div style="padding:16px 24px;">
            ${photoUrls.length > 0
              ? photoUrls.map((url, i) => {
                  if (url.startsWith('http')) {
                    return `<a href="${url}" style="display:inline-block;margin:0 8px 8px 0;background:#c9a84c;color:#0a0a0a;text-decoration:none;font-size:13px;font-weight:bold;padding:10px 16px;text-transform:uppercase;letter-spacing:1px;">${isFr ? 'Photo' : 'Photo'} ${i + 1}</a>`;
                  }
                  return `<span style="display:inline-block;margin:0 8px 8px 0;color:#888;font-size:13px;">${url}</span>`;
                }).join('')
              : (isFr ? 'Aucune photo' : 'No photos')
            }
            ${photoUrls.length > 0 ? `<p style="margin:12px 0 0;font-size:12px;color:#888;">${isFr ? 'Les liens expirent dans 7 jours.' : 'Links expire in 7 days.'}</p>` : ''}
          </div>
        </div>

        <!-- Reply CTA -->
        <div style="background:#1a1a1a;border:1px solid #2a2a2a;border-top:none;padding:24px;text-align:center;">
          <a href="mailto:${escapeHtml(record.email)}" style="display:inline-block;background:#c9a84c;color:#0a0a0a;text-decoration:none;font-size:14px;font-weight:bold;padding:14px 32px;text-transform:uppercase;letter-spacing:1px;">
            ${isFr ? 'Répondre au client' : 'Reply to customer'}
          </a>
        </div>

        <!-- Footer -->
        <div style="padding:20px;text-align:center;">
          <p style="margin:0;font-size:12px;color:#666;line-height:1.6;">
            Exact roues inc — 1420 Boul Hymus, Dorval, QC H9P 1J6<br>
            (514) 683-6999 — exactwheels.com<br>
            <span style="color:#444;">${isFr ? 'Cet email a été généré automatiquement par le formulaire de devis en ligne.' : 'This email was automatically generated by the online quote form.'}</span>
          </p>
        </div>

      </div>
    `;

    // Send email via Resend
    const resendApiKey = Deno.env.get("RESEND_API_KEY") || "";
    const resendResponse = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${resendApiKey}`,
        'Content-Type': 'application/json',
        'User-Agent': 'send-quote-email/1.0',
        'Idempotency-Key': record.id,
      },
      body: JSON.stringify({
        from: 'info@exactwheels.com',
        to: 'info@exactwheels.com',
        reply_to: record.email,
        subject,
        html,
      }),
    });

    if (!resendResponse.ok) {
      const errorBody = await resendResponse.text();
      console.error('Resend API error:', resendResponse.status, errorBody);

      // Rate limit / quota exhausted → return 200 to stop webhook retries
      if (resendResponse.status === 429 || errorBody.includes('daily limit') || errorBody.includes('quota')) {
        return new Response(JSON.stringify({ success: false, reason: 'rate_limited' }), {
          status: 200,
          headers: { 'Content-Type': 'application/json' },
        });
      }

      return new Response(JSON.stringify({ error: 'email_send_failed' }), {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    // Parse success response (optional validation)
    await resendResponse.json();

    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (err) {
    console.error('Internal error in send-quote-email:', err);
    return new Response(JSON.stringify({ error: 'internal' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
});
