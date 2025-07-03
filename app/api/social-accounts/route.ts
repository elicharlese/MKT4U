import { NextRequest } from 'next/server'
import { createServerClient } from '@/lib/supabase/server'
import { validateRequest } from '@/lib/errors'
import { socialAccountSchema, createSocialAccountSchema } from '@/lib/validations'
import { getUser } from '@/lib/auth'
import { handleApiError, createSuccessResponse } from '@/lib/errors'

/**
 * @description Get all social accounts for the authenticated user
 * @returns Array of social accounts
 * @security BearerAuth
 */
export async function GET(request: NextRequest) {
  try {
    const user = await getUser(request)
    if (!user) {
      return handleApiError(new Error('Unauthorized'))
    }

    const supabase = createServerClient()
    
    const { data: socialAccounts, error } = await supabase
      .from('social_accounts')
      .select('*')
      .eq('user_id', user.id)
      .order('created_at', { ascending: false })

    if (error) {
      return handleApiError(error)
    }

    return createSuccessResponse(socialAccounts)
  } catch (error) {
    return handleApiError(error)
  }
}

/**
 * @description Create a new social account connection
 * @param {object} body - Social account data
 * @returns Created social account
 * @security BearerAuth
 */
export async function POST(request: NextRequest) {
  try {
    const user = await getUser(request)
    if (!user) {
      return handleApiError(new Error('Unauthorized'))
    }

    const body = await request.json()
    const validatedData = validateRequest(createSocialAccountSchema, body)
    
    const supabase = createServerClient()
    
    // Check if account already exists for this platform
    const { data: existingAccount } = await supabase
      .from('social_accounts')
      .select('id')
      .eq('user_id', user.id)
      .eq('platform', validatedData.platform)
      .single()

    if (existingAccount) {
      return handleApiError(new Error('Account already connected for this platform'))
    }

    const { data: socialAccount, error } = await supabase
      .from('social_accounts')
      .insert({
        ...validatedData,
        user_id: user.id,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      })
      .select()
      .single()

    if (error) {
      return handleApiError(error)
    }

    return createSuccessResponse(socialAccount, 'Social account connected successfully')
  } catch (error) {
    return handleApiError(error)
  }
}
