import { createClient } from "@supabase/supabase-js";
import * as fs from "fs";

const envContent = fs.readFileSync(".env.local", "utf-8");
const envVars: any = {};
envContent.split("\n").forEach(line => {
    const [key, ...val] = line.split("=");
    if (key && val) envVars[key.trim()] = val.join("=").trim();
});

const supabaseUrl = envVars["NEXT_PUBLIC_SUPABASE_URL"];
const supabaseKey = envVars["NEXT_PUBLIC_SUPABASE_ANON_KEY"];

const supabase = createClient(supabaseUrl, supabaseKey);

async function testFetchPlayers() {
    console.log("Setting current users to level 3...");
    const { error: updErr } = await supabase.from("players").update({ current_level: 3 });
    if (updErr) console.error(updErr);

    console.log("Fetching level 3 players...");

    // Then test the specific query logic exactly as CollabLobby does.
    const { data: online, error: onlineErr } = await supabase
        .from("players")
        .select(`
            id, 
            pc_id,
            current_level,
            access_keys (assigned_to)
        `)
        .eq("is_online", true)
        .eq("current_level", 3);

    console.log("Level 3 Online:", JSON.stringify(online, null, 2), onlineErr);
}

testFetchPlayers();
