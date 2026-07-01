# Webhook Setup Guide — Supabase Dashboard

This guide configures a database webhook so that every new quote request automatically triggers an email to `info@exactwheels.com`.

## Step-by-step

1. Go to the Supabase dashboard: https://supabase.com/dashboard/project/nyhhufcwdwwhuuwtifdl
2. In the left sidebar, click **Database → Webhooks**
3. Click **Create a new webhook**
4. Fill in the fields exactly as follows:
   - **Name:** `send-quote-email`
   - **Table:** `quote_requests`
   - **Events:** check **Insert** only
   - **HTTP Method:** `POST`
   - **URL:** `https://nyhhufcwdwwhuuwtifdl.supabase.co/functions/v1/send-quote-email`
   - **Timeout:** `1000` ms (or leave the default)
   - **JWT verification:** **ON** — this is critical. It makes Supabase auto-append the service-role key in the `Authorization` header, which the edge function checks to prevent public abuse.
5. Click **Save**

## Test it

Submit the quote form at `/devis` with a test entry and check that an email arrives at `info@exactwheels.com`.

## Important notes

- **Rotate your API key:** After confirming everything works, rotate the Resend API key in your Resend dashboard and update the Supabase secret under **Edge Functions → Secrets**, since the key was shared in chat.
- **Sender address:** The email sender is currently `onboarding@resend.dev` (Resend's default for unverified domains). To send from `info@exactwheels.com`, verify your domain in Resend → **Domains → Add Domain**, then update the `from` field in the edge function (`supabase/functions/send-quote-email/index.ts`).

## Troubleshooting

If no email arrives after submitting a quote:

1. **Webhook enabled?** Check Database → Webhooks and make sure the webhook is enabled (toggle is ON).
2. **JWT verification ON?** Re-open the webhook settings and confirm JWT verification is enabled.
3. **Edge function deployed?** Run:
   ```bash
   supabase functions deploy send-quote-email --project-ref nyhhufcwdwwhuuwtifdl
   ```
4. **Resend API key set?** In the Supabase dashboard, go to **Edge Functions → Secrets** and verify `RESEND_API_KEY` is set.
5. **Check logs:** In the Supabase dashboard, go to **Logs → Edge Functions**, filter by `send-quote-email`, and look for error output.
