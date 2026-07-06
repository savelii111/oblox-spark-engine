
CREATE TABLE public.integrations (
  slug TEXT PRIMARY KEY,
  api_key TEXT,
  connected BOOLEAN NOT NULL DEFAULT false,
  last_tested_at TIMESTAMPTZ,
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
GRANT ALL ON public.integrations TO service_role;
ALTER TABLE public.integrations ENABLE ROW LEVEL SECURITY;
-- No policies: only accessible from server via service role (admin client).

INSERT INTO public.integrations (slug, connected) VALUES
  ('meshy', false),
  ('roblox', false),
  ('blender', false),
  ('openai', false),
  ('anthropic', false)
ON CONFLICT (slug) DO NOTHING;
