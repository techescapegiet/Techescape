import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
const supabase = createClient(supabaseUrl, supabaseAnonKey)

async function checkSchema() {
  const { data, error } = await supabase
    .from('event_settings')
    .select('*')
    .eq('id', 1)
    .single()

  if (error) {
    console.error('Error fetching event_settings:', error)
  } else {
    console.log('Event settings columns:', Object.keys(data))
    console.log('Event settings data:', data)
  }
}

checkSchema()
