CREATE TABLE public.quote_requests (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  vehicle TEXT,
  wheel_size TEXT,
  service_type TEXT,
  description TEXT NOT NULL,
  photo_urls TEXT[] NOT NULL DEFAULT '{}',
  language TEXT NOT NULL DEFAULT 'fr',
  status TEXT NOT NULL DEFAULT 'new',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

GRANT INSERT ON public.quote_requests TO anon, authenticated;
GRANT ALL ON public.quote_requests TO service_role;

ALTER TABLE public.quote_requests ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can submit a quote request"
ON public.quote_requests
FOR INSERT
TO anon, authenticated
WITH CHECK (
  char_length(name) BETWEEN 1 AND 120
  AND char_length(email) BETWEEN 3 AND 255
  AND char_length(description) BETWEEN 1 AND 4000
  AND coalesce(array_length(photo_urls, 1), 0) <= 10
);
