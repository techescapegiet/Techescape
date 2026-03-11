import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
const supabase = createClient(supabaseUrl, supabaseAnonKey)

async function checkSchema() {
  const { data, error } = await supabase
    .from('players')
    .select('*')
    .limit(1)
    .single()

  if (error) {
    console.error('Error fetching players:', error)
  } else {
    console.log('Players columns:', Object.keys(data))
    console.log('Players data:', data)
  }
}

checkSchema()
