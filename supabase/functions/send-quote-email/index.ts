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
    case 'polish':
      return isFr ? 'Polissage miroir' : 'Mirror polishing';
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
    if (!timingSafeEqual(token, serviceRoleKey)) {
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
          .createSignedUrl(path, 86400);
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
      <h2>${isFr ? 'Nouvelle demande de devis' : 'New quote request'}</h2>
      <table border="1" cellpadding="6" cellspacing="0" style="border-collapse:collapse;font-family:sans-serif">
        <tr><td><b>${isFr ? 'Nom' : 'Name'}</b></td><td>${escapeHtml(record.name)}</td></tr>
        <tr><td><b>Email</b></td><td>${escapeHtml(record.email)}</td></tr>
        <tr><td><b>${isFr ? 'Téléphone' : 'Phone'}</b></td><td>${escapeHtml(record.phone) || '—'}</td></tr>
        <tr><td><b>${isFr ? 'Véhicule' : 'Vehicle'}</b></td><td>${escapeHtml(record.vehicle) || '—'}</td></tr>
        <tr><td><b>${isFr ? 'Dimension' : 'Wheel size'}</b></td><td>${escapeHtml(record.wheel_size) || '—'}</td></tr>
        <tr><td><b>${isFr ? 'Service' : 'Service'}</b></td><td>${getServiceLabel(record.service_type, record.language)}</td></tr>
        <tr><td><b>${isFr ? 'Description' : 'Description'}</b></td><td>${escapeHtml(record.description)}</td></tr>
        <tr><td><b>${isFr ? 'Langue' : 'Language'}</b></td><td>${record.language || '—'}</td></tr>
      </table>
      <h3>${isFr ? 'Photos' : 'Photos'}</h3>
      <div>${photoSection}</div>
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
        from: 'onboarding@resend.dev',
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
