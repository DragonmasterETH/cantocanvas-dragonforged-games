import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://qvylvdgoodpdwrvjuaxc.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InF2eWx2ZGdvb2RwZHdydmp1YXhjIiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODk0NTQyNjUsImV4cCI6MjAwNTAzMDI2NX0.D947Ai1zypCESSFVdeC81xB6nAciZFj2YF4mOhOkOrg';//process.env.SUPABASE_KEY;
const client = createClient(supabaseUrl, supabaseKey)

export const Supabase = {
    client
  };