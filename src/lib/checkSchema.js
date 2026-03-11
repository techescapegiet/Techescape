const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = "https://ojxfbhsswffjqrargctg.supabase.co";
const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9qeGZiaHNzd2ZmanFyYXJnY3RnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzMwMjk0NjksImV4cCI6MjA4ODYwNTQ2OX0.Bfbb_sEWSCmtwMS-B1aG2GItPbBz9YH9BtP3QrbVffw";
const supabase = createClient(supabaseUrl, supabaseAnonKey);

async function checkSchema() {
  try {
    const { data, error } = await supabase
      .from('players')
      .select('*')
      .limit(1)
      .maybeSingle();

    if (error) {
      console.error('Error fetching players:', error);
    } else {
      console.log('Players columns:', data ? Object.keys(data) : 'No data');
      console.log('Players data:', data);
    }

    const { data: settings, error: settingsError } = await supabase
      .from('event_settings')
      .select('*')
      .eq('id', 1)
      .single();

    if (settingsError) {
      console.error('Error fetching event_settings:', settingsError);
    } else {
      console.log('Event settings columns:', Object.keys(settings));
      console.log('Event settings data:', settings);
    }
  } catch (err) {
    console.error('Runtime error:', err);
  }
}

checkSchema();
