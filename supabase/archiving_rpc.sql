-- ARCHIVE TABLE FOR SESSION HISTORY
CREATE TABLE IF NOT EXISTS player_archives (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    session_id UUID,
    operative_name TEXT,
    roll_number TEXT,
    email TEXT,
    academic_year TEXT,
    department TEXT,
    final_node TEXT,
    status TEXT,
    archived_at TIMESTAMPTZ DEFAULT NOW()
);

-- RPC TO FINALIZE BATCH: MOVE DATA TO ARCHIVE AND RESET STATIONS
CREATE OR REPLACE FUNCTION archive_and_purge_batch()
RETURNS void AS $$
BEGIN
    -- 1. Snapshot all current players into archives
    INSERT INTO player_archives (
        session_id, 
        operative_name, 
        roll_number, 
        email, 
        academic_year, 
        department, 
        final_node, 
        status
    )
    SELECT 
        p.id,
        ak.assigned_to,
        ak.roll_number,
        ak.email,
        ak.academic_year,
        ak.department,
        CASE 
            WHEN p.status = 'completed' THEN 'SUCCESS'
            WHEN p.status = 'failed' THEN 'FAILED'
            ELSE 'ACTIVE_TERMINATED (' || p.current_level || ')'
        END,
        p.status
    FROM players p
    JOIN access_keys ak ON p.pc_id = ak.pc_id;

    -- 2. Clear collab sessions
    DELETE FROM collab_sessions;

    -- 3. Clear players table
    DELETE FROM players;

    -- 4. Reset access keys assignments and rotate pins for next batch
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
