
-- Boat configuration presets table
CREATE TABLE public.boat_configs (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  description TEXT,
  subsystem TEXT NOT NULL DEFAULT 'full', -- 'hull', 'rigging', 'sail', 'rudder', 'pulleys', 'cockpit', 'ocean', 'full'
  config JSONB NOT NULL DEFAULT '{}'::jsonb,
  thumbnail_url TEXT,
  is_default BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.boat_configs ENABLE ROW LEVEL SECURITY;

-- Anyone can read default configs
CREATE POLICY "Default configs are public" ON public.boat_configs
  FOR SELECT USING (is_default = true);

-- Users can CRUD their own configs
CREATE POLICY "Users can view own configs" ON public.boat_configs
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can create configs" ON public.boat_configs
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own configs" ON public.boat_configs
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own configs" ON public.boat_configs
  FOR DELETE USING (auth.uid() = user_id);

-- Anon users can also read/write with null user_id for now (no auth required initially)
CREATE POLICY "Anon can insert without user_id" ON public.boat_configs
  FOR INSERT WITH CHECK (user_id IS NULL);

CREATE POLICY "Anon can read own null configs" ON public.boat_configs
  FOR SELECT USING (user_id IS NULL);

-- Auto-update timestamp
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

CREATE TRIGGER update_boat_configs_updated_at
  BEFORE UPDATE ON public.boat_configs
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

-- Index for fast lookups
CREATE INDEX idx_boat_configs_subsystem ON public.boat_configs(subsystem);
CREATE INDEX idx_boat_configs_user ON public.boat_configs(user_id);
