-- ==========================================
-- CONSOLIDATED DATABASE FIX (RUN THIS ONCE)
-- ==========================================

-- 1. Ensure players table has the new tracking columns
ALTER TABLE players ADD COLUMN IF NOT EXISTS completed_at TIMESTAMPTZ;
ALTER TABLE players ADD COLUMN IF NOT EXISTS level_logs JSONB DEFAULT '{}'::jsonb;

-- 2. Ensure player_archives table exists with ALL required columns
CREATE TABLE IF NOT EXISTS player_archives (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    session_id UUID,
    operative_name TEXT,
    roll_number TEXT,
    email TEXT,
    academic_year TEXT,
    department TEXT,
    level_logs JSONB DEFAULT '{}'::jsonb,
    final_node TEXT,
    status TEXT,
    completed_at TIMESTAMPTZ,
    archived_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. In case the table already existed but was missing columns, add them manually
DO $$ 
BEGIN
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='player_archives' AND column_name='session_id') THEN
        ALTER TABLE player_archives ADD COLUMN session_id UUID;
    END IF;
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='player_archives' AND column_name='completed_at') THEN
        ALTER TABLE player_archives ADD COLUMN completed_at TIMESTAMPTZ;
    END IF;
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='player_archives' AND column_name='academic_year') THEN
        ALTER TABLE player_archives ADD COLUMN academic_year TEXT;
    END IF;
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='player_archives' AND column_name='department') THEN
        ALTER TABLE player_archives ADD COLUMN department TEXT;
    END IF;
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='player_archives' AND column_name='level_logs') THEN
        ALTER TABLE player_archives ADD COLUMN level_logs JSONB DEFAULT '{}'::jsonb;
    END IF;
END $$;

-- 4. Re-implement the Archive RPC to ensure it matches the final schema
CREATE OR REPLACE FUNCTION archive_and_purge_batch()
RETURNS void AS $$
BEGIN
    -- A. Snapshot all current players into archives
    INSERT INTO player_archives (
        session_id, 
        operative_name, 
        roll_number, 
        email, 
        academic_year, 
        department, 
        level_logs,
        final_node, 
        status,
        completed_at,
        archived_at
    )
    SELECT 
        p.id,
        ak.assigned_to,
        ak.roll_number,
        ak.email,
        ak.academic_year,
        ak.department,
        p.level_logs,
        CASE 
            WHEN p.status = 'completed' THEN 'SUCCESS'
            WHEN p.status = 'failed' THEN 'FAILED'
            ELSE 'ACTIVE_TERMINATED (' || p.current_level || ')'
        END,
        p.status,
        p.completed_at,
        NOW()
    FROM players p
    JOIN access_keys ak ON p.pc_id = ak.pc_id;

    -- B. Clear collab sessions
    DELETE FROM collab_sessions;

    -- C. Clear players table
    DELETE FROM players;

    -- D. Reset access keys assignments and rotate pins for next batch
    UPDATE access_keys
    SET 
        is_assigned = false,
        assigned_to = null,
        roll_number = null,
        email = null,
        academic_year = null,
        department = null,
        user_id = null,
        pin = (floor(random() * 900000) + 100000)::text;

END;
$$ LANGUAGE plpgsql;

-- 5. Helper RPC to update level logs (Call this from frontend when advancing node)
CREATE OR REPLACE FUNCTION update_player_level_logs(
    player_id TEXT,
    level_key TEXT,
    p_timestamp TIMESTAMPTZ
) RETURNS void AS $$
BEGIN
    UPDATE players
    SET level_logs = jsonb_set(
        COALESCE(level_logs, '{}'::jsonb),
        ARRAY[level_key],
        to_jsonb(p_timestamp)
    )
    WHERE id = player_id;
END;
$$ LANGUAGE plpgsql;
