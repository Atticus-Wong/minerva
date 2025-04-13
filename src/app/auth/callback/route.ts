import { NextResponse } from 'next/server'
import { createClient } from '@/utils/supabase/server'

export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url)
  const code = searchParams.get('code')
  // Set the default redirect path to your configuration page
  const configureProfilePath = '/configure-profile' // Or whatever your config page path is

  if (code) {
    const supabase = await createClient()
    const { error } = await supabase.auth.exchangeCodeForSession(code)
    if (!error) {
      // Successfully exchanged code for session, redirect to configuration page
      const forwardedHost = request.headers.get('x-forwarded-host') // original origin before load balancer
      const isLocalEnv = process.env.NODE_ENV === 'development'
      if (isLocalEnv) {
        // Redirect to configuration page in local environment
        return NextResponse.redirect(`${origin}${configureProfilePath}`)
      } else if (forwardedHost) {
        // Redirect to configuration page using forwarded host
        return NextResponse.redirect(
          `https://${forwardedHost}${configureProfilePath}`
        )
      } else {
        // Redirect to configuration page using origin
        return NextResponse.redirect(`${origin}${configureProfilePath}`)
      }
    }
  }

  // return the user to an error page with instructions if code exchange failed or no code was present
  return NextResponse.redirect(`${origin}/auth/auth-code-error`)
}
