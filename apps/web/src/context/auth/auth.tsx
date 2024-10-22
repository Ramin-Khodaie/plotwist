'use client'

import { createContext, useContext, useState } from 'react'
import { AuthContext, AuthContextProviderProps } from './auth.types'
import { toast } from 'sonner'

import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { Profile } from '@/types/supabase'

import { useLanguage } from '../language'
import { APP_URL } from '../../../constants'

export const authContext = createContext({} as AuthContext)

export const AuthContextProvider = ({
  children,
  initialUser,
}: AuthContextProviderProps) => {
  const [user, setUser] = useState<Profile | null>(initialUser)
  const { dictionary, language } = useLanguage()
  const supabase = createClientComponentClient()

  const logout = async () => {
    const { error } = await supabase.auth.signOut()

    if (error) {
      toast.error(error.message, {
        action: {
          label: dictionary.sign_up_form.try_again,
          onClick: () => logout(),
        },
      })

      return
    }

    toast.success(dictionary.auth.logout_success)
    setUser(null)
  }

  async function signInWithOTP(email: string) {
    await supabase.auth.signInWithOtp({
      email,
      options: {
        shouldCreateUser: false,
        emailRedirectTo: `${APP_URL}/${language}/home`,
      },
    })
  }

  async function signUpWithOTP(email: string, username: string) {
    await supabase.auth.signInWithOtp({
      email,
      options: {
        data: { username },
        emailRedirectTo: `${APP_URL}/${language}/${username}`,
      },
    })
  }

  return (
    <authContext.Provider
      value={{
        user,
        signUpWithOTP,
        signInWithOTP,
        logout,
      }}
    >
      {children}
    </authContext.Provider>
  )
}

export const useAuth = () => {
  const context = useContext(authContext)

  if (!context) {
    throw new Error('ListsContext must be used within ListsContextProvider')
  }

  return context
}
