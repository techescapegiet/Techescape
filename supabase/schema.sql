-- Create access_keys table to manage PC-specific tokens
CREATE TABLE IF NOT EXISTS access_keys (
    pc_id TEXT PRIMARY KEY, -- e.g., PC-01
    pin TEXT UNIQUE NOT NULL, -- The secret login token
    hint TEXT, -- Location hint
    is_assigned BOOLEAN DEFAULT FALSE,
    assigned_to TEXT, -- Student Name
    roll_number TEXT, -- University Roll No
    email TEXT, -- Official Email
    academic_year TEXT, -- 1st, 2nd, 3rd, 4th Year
    department TEXT, -- CSE, IT, etc.
    user_id UUID UNIQUE, -- Linked to Supabase Auth user
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Enable Realtime for access_keys (Will fail if already in publication, but we can catch it)
-- ALTER PUBLICATION supabase_realtime ADD TABLE access_keys;

-- RLS Policies for access_keys
ALTER TABLE access_keys ENABLE ROW LEVEL SECURITY;
DO $$ 
BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'Public Read Access Keys') THEN
        CREATE POLICY "Public Read Access Keys" ON access_keys FOR SELECT USING (true);
    END IF;
    IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'Public Update Access Keys') THEN
        CREATE POLICY "Public Update Access Keys" ON access_keys FOR UPDATE USING (true) WITH CHECK (true);
    END IF;
END $$;

-- Create event_settings table
CREATE TABLE IF NOT EXISTS event_settings (
    id INTEGER PRIMARY KEY DEFAULT 1,
    is_live BOOLEAN DEFAULT FALSE,
    maintenance_message TEXT DEFAULT 'WAIT FOR THE EVENT - SYSTEM IS NOT ONLINE',
    CONSTRAINT one_row CHECK (id = 1)
);

-- Initialize settings
INSERT INTO event_settings (id, is_live) VALUES (1, false) ON CONFLICT (id) DO NOTHING;

-- RLS for event_settings
ALTER TABLE event_settings ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public Read Settings" ON event_settings FOR SELECT USING (true);

-- Create players table to track online status and progress
CREATE TABLE IF NOT EXISTS players (
    id TEXT PRIMARY KEY, -- Using the pc_id (e.g., PC-01)
    token TEXT,
    current_level INTEGER DEFAULT 1,
    last_seen TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    is_online BOOLEAN DEFAULT TRUE
);

-- Create collab_sessions table for real-time multiplayer
CREATE TABLE collab_sessions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    host_id TEXT REFERENCES players(id),
    guest_id TEXT REFERENCES players(id),
    status TEXT DEFAULT 'pending', -- pending, active, completed, failed
    current_step INTEGER DEFAULT 0,
    host_answered BOOLEAN DEFAULT FALSE,
    guest_answered BOOLEAN DEFAULT FALSE,
    attempts_left INTEGER DEFAULT 3,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Enable Realtime for collab_sessions
ALTER PUBLICATION supabase_realtime ADD TABLE collab_sessions;
ALTER PUBLICATION supabase_realtime ADD TABLE players;

-- RLS Policies (Simplified for development)
ALTER TABLE players ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public Read" ON players FOR SELECT USING (true);
CREATE POLICY "Public Insert/Update" ON players FOR ALL USING (true);

ALTER TABLE collab_sessions ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public Read Sessions" ON collab_sessions FOR SELECT USING (true);
CREATE POLICY "Public All Sessions" ON collab_sessions FOR ALL USING (true);
