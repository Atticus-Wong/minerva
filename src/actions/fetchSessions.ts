import { createClient } from '@/utils/supabase/client'

const fetchSessions = async () => {
  const supabase = createClient()
  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser()
  // Error handling
  if (userError || !user) {
    console.error('Error fetching user:', userError)
    return { data: [], error: userError || new Error('User not found') }
  }
  const { data, error } = await supabase
    .from('Sessions')
    .select()
    .eq('id', user.id)
  if (error) {
    console.error('Error fetching sessions:', error)
    return { data: [], error }
  }
  return { data, error: null }
}

export default fetchSessions
