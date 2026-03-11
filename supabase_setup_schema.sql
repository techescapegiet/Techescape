-- TECHESCAPE: SUPABASE DATABASE SCHEMA
-- This script sets up the tables, policies, and realtime publications for a fresh Techescape instance.

-- 1. ACCESS KEYS TABLE (PC & PIN Assignments)
CREATE TABLE IF NOT EXISTS access_keys (
    pc_id TEXT PRIMARY KEY,
    pin TEXT UNIQUE NOT NULL,
    hint TEXT,
    is_assigned BOOLEAN DEFAULT FALSE,
    assigned_to TEXT,
    roll_number TEXT,
    email TEXT,
    academic_year TEXT,
    department TEXT,
    user_id UUID UNIQUE,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. EVENT SETTINGS TABLE (Global Control)
CREATE TABLE IF NOT EXISTS event_settings (
    id INTEGER PRIMARY KEY DEFAULT 1,
    is_live BOOLEAN DEFAULT FALSE,
    game_started BOOLEAN DEFAULT FALSE,
    maintenance_message TEXT DEFAULT 'WAIT FOR THE EVENT - SYSTEM IS NOT ONLINE',
    CONSTRAINT one_row CHECK (id = 1)
);

-- Initialize the single settings row
INSERT INTO event_settings (id, is_live, game_started, maintenance_message) 
VALUES (1, false, false, 'WAIT FOR THE EVENT - SYSTEM IS NOT ONLINE') 
ON CONFLICT (id) DO UPDATE SET 
    is_live = EXCLUDED.is_live,
    game_started = EXCLUDED.game_started,
    maintenance_message = EXCLUDED.maintenance_message;

-- 3. PLAYERS TABLE (Active Sessions & Progress)
CREATE TABLE IF NOT EXISTS players (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL,
    pc_id TEXT,
    roll_number TEXT,
    email TEXT,
    token TEXT, -- The PIN used for this session
    current_level INTEGER DEFAULT 1,
    status TEXT DEFAULT 'active', -- 'active', 'completed', 'failed'
    is_online BOOLEAN DEFAULT TRUE,
    last_seen TIMESTAMPTZ DEFAULT NOW(),
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 4. COLLAB SESSIONS TABLE (Level 3 Multiplayer)
CREATE TABLE IF NOT EXISTS collab_sessions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    host_id UUID REFERENCES players(id),
    guest_id UUID REFERENCES players(id),
    status TEXT DEFAULT 'pending', -- 'pending', 'active', 'completed', 'failed'
    current_step INTEGER DEFAULT 0,
    host_answered BOOLEAN DEFAULT FALSE,
    guest_answered BOOLEAN DEFAULT FALSE,
    attempts_left INTEGER DEFAULT 3,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 5. REALTIME CONFIGURATION
-- Enable Realtime for all interactive tables
-- Note: Run these individually in the Supabase SQL editor if they already exist in the publication.
BEGIN;
  DROP PUBLICATION IF EXISTS supabase_realtime;
  CREATE PUBLICATION supabase_realtime FOR TABLE 
    players, 
    access_keys, 
    event_settings, 
    collab_sessions;
COMMIT;

-- 6. ROW LEVEL SECURITY (RLS)
-- Use DROP POLICY IF EXISTS to allow the script to be re-run indefinitely

ALTER TABLE access_keys ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Public Read Access Keys" ON access_keys;
CREATE POLICY "Public Read Access Keys" ON access_keys FOR SELECT USING (true);
DROP POLICY IF EXISTS "Public Update Access Keys" ON access_keys;
CREATE POLICY "Public Update Access Keys" ON access_keys FOR UPDATE USING (true);

ALTER TABLE event_settings ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Public Read Settings" ON event_settings;
CREATE POLICY "Public Read Settings" ON event_settings FOR SELECT USING (true);
DROP POLICY IF EXISTS "Admin Update Settings" ON event_settings;
CREATE POLICY "Admin Update Settings" ON event_settings FOR ALL USING (true);

ALTER TABLE players ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Public Player Access" ON players;
CREATE POLICY "Public Player Access" ON players FOR ALL USING (true);

ALTER TABLE collab_sessions ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Public Collab Access" ON collab_sessions;
CREATE POLICY "Public Collab Access" ON collab_sessions FOR ALL USING (true);

-- 7. HELPER FUNCTIONS (Optional)
-- Function to automatically update 'updated_at' timestamps
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

DROP TRIGGER IF EXISTS update_collab_sessions_updated_at ON collab_sessions;
CREATE TRIGGER update_collab_sessions_updated_at
    BEFORE UPDATE ON collab_sessions
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();
