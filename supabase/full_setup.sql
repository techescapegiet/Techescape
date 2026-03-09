-- ========================================================
-- GIET TECH ESCAPE ROOM: COMPLETE DATABASE SETUP SCRIPT
-- RUN THIS IN SUPABASE SQL EDITOR
-- ========================================================

-- 1. ACCESS KEYS TABLE (Main registration and PC tracking)
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
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 2. ENSURE MISSING COLUMNS EXIST (For existing tables)
DO $$ 
BEGIN
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='access_keys' AND column_name='user_id') THEN
        ALTER TABLE access_keys ADD COLUMN user_id UUID UNIQUE;
    END IF;
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='access_keys' AND column_name='roll_number') THEN
        ALTER TABLE access_keys ADD COLUMN roll_number TEXT;
    END IF;
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='access_keys' AND column_name='email') THEN
        ALTER TABLE access_keys ADD COLUMN email TEXT;
    END IF;
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='access_keys' AND column_name='academic_year') THEN
        ALTER TABLE access_keys ADD COLUMN academic_year TEXT;
    END IF;
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='access_keys' AND column_name='department') THEN
        ALTER TABLE access_keys ADD COLUMN department TEXT;
    END IF;
END $$;

-- 3. ACCESS KEYS RLS (Security)
ALTER TABLE access_keys ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Public Read Access Keys" ON access_keys;
CREATE POLICY "Public Read Access Keys" ON access_keys FOR SELECT USING (true);

DROP POLICY IF EXISTS "Public Update Access Keys" ON access_keys;
CREATE POLICY "Public Update Access Keys" ON access_keys 
FOR UPDATE USING (true) 
WITH CHECK (true);

-- 4. EVENT SETTINGS (Live/Offline Toggle)
CREATE TABLE IF NOT EXISTS event_settings (
    id INTEGER PRIMARY KEY DEFAULT 1,
    is_live BOOLEAN DEFAULT FALSE,
    maintenance_message TEXT DEFAULT 'WAIT FOR THE EVENT - SYSTEM IS NOT ONLINE',
    CONSTRAINT one_row CHECK (id = 1)
);

INSERT INTO event_settings (id, is_live) VALUES (1, false) ON CONFLICT (id) DO NOTHING;

ALTER TABLE event_settings ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Public Read Settings" ON event_settings;
CREATE POLICY "Public Read Settings" ON event_settings FOR SELECT USING (true);

-- 5. PLAYERS TABLE (Active mission tracking)
CREATE TABLE IF NOT EXISTS players (
    id TEXT PRIMARY KEY REFERENCES access_keys(pc_id), -- Using the pc_id (e.g., PC-01)
    token TEXT,
    current_level INTEGER DEFAULT 1,
    last_seen TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    is_online BOOLEAN DEFAULT TRUE
);

ALTER TABLE players ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Public Read Players" ON players;
CREATE POLICY "Public Read Players" ON players FOR SELECT USING (true);
DROP POLICY IF EXISTS "Public Manage Players" ON players;
CREATE POLICY "Public Manage Players" ON players FOR ALL USING (true);

-- 6. COLLAB SESSIONS (Multiplayer Level 3)
CREATE TABLE IF NOT EXISTS collab_sessions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    host_id TEXT REFERENCES players(id),
    guest_id TEXT REFERENCES players(id),
    status TEXT DEFAULT 'pending', 
    current_step INTEGER DEFAULT 0,
    host_answered BOOLEAN DEFAULT FALSE,
    guest_answered BOOLEAN DEFAULT FALSE,
    attempts_left INTEGER DEFAULT 3,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

ALTER TABLE collab_sessions ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Public All Sessions" ON collab_sessions;
CREATE POLICY "Public All Sessions" ON collab_sessions FOR ALL USING (true);

-- 7. ENABLE REALTIME
-- Note: These might fail if already exists, which is fine
DO $$
BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_publication_tables WHERE pubname = 'supabase_realtime' AND tablename = 'collab_sessions') THEN
        ALTER PUBLICATION supabase_realtime ADD TABLE collab_sessions;
    END IF;
    IF NOT EXISTS (SELECT 1 FROM pg_publication_tables WHERE pubname = 'supabase_realtime' AND tablename = 'players') THEN
        ALTER PUBLICATION supabase_realtime ADD TABLE players;
    END IF;
END $$;

-- 8. SEED 50 PCS (Updates hint, preserves existing assignments)
INSERT INTO access_keys (pc_id, pin, hint, is_assigned, user_id)
SELECT 
    'PC-' || LPAD(s.id::text, 2, '0'),
    (floor(random() * 900000) + 100000)::text, 
    'Located in Section ' || CASE 
        WHEN s.id <= 10 THEN 'A (North Wall)'
        WHEN s.id <= 20 THEN 'B (East Windows)'
        WHEN s.id <= 30 THEN 'C (Center Isle)'
        WHEN s.id <= 40 THEN 'D (West Wall)'
        ELSE 'E (Server Room Area)'
    END,
    false, 
    NULL   
FROM generate_series(1, 50) AS s(id)
ON CONFLICT (pc_id) DO UPDATE SET
    hint = EXCLUDED.hint;

-- 9. FINAL VERIFICATION
SELECT count(*) as total_pcs, count(*) filter (where is_assigned = false) as unassigned_pcs FROM access_keys;
