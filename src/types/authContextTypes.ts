import { createContext } from 'react'
import { Session, User } from '@supabase/supabase-js'

export type AuthContextType = {
  user: User | null
  session: Session | null
  userId: string | null
  loading: boolean
  signIn: (
    email: string,
    password: string
  ) => Promise<{
    error: unknown,
    session: Session | null,
    user: User | null
  }>
  signUp: (email: string, password: string) => Promise<{ error: unknown }>
  signOut: () => Promise<void>
}

export const AuthContext = createContext<AuthContextType | null>(null)
