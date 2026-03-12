-- Migration Phase 12: Admin-Controlled Level Transitions
ALTER TABLE event_settings ADD COLUMN IF NOT EXISTS unlocked_level INTEGER DEFAULT 1;

-- Add comment for clarity
COMMENT ON COLUMN event_settings.unlocked_level IS 'The maximum level a player is allowed to proceed to without admin clearance.';
