import { NextResponse } from 'next/server'
import { createClient } from '@/utils/supabase/server'

export async function GET() {
  try {
    // Create server supabase client
    const supabase = await createClient()

    // Get the session data
    const { data, error } = await supabase.auth.getSession()

    if (error) {
      console.error('Error fetching session:', error.message)
      return NextResponse.json(
        {
          error: 'Error fetching session',
          message: error.message,
        },
        { status: 401 }
      )
    }

    // Return session data with user info but without sensitive tokens
    return NextResponse.json({
      authenticated: !!data.session,
      session: data.session
        ? {
            expires_at: data.session.expires_at,
          }
        : null,
      user: data.session?.user
        ? {
            id: data.session.user.id,
            email: data.session.user.email,
            user_metadata: data.session.user.user_metadata,
            app_metadata: data.session.user.app_metadata,
            created_at: data.session.user.created_at,
            updated_at: data.session.user.updated_at,
          }
        : null,
    })
  } catch (error) {
    console.error('Unexpected error checking session:', error)
    return NextResponse.json(
      {
        error: 'Unexpected error',
        message: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    )
  }
}
