'use client'

import { useMutation } from '@tanstack/react-query'
import axios from 'axios'
import { useContext, createContext } from 'react'

interface User {
  id: string
  name: string
  image?: string
}

interface AuthContext {}

interface AuthProviderProps {
  children: React.ReactNode
}

const Context = createContext<AuthContext | null>(null)

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const signup = useMutation({
    mutationFn: (user: User) =>
      axios.post(`${process.env.NEXT_PUBLIC_SERVER_URL}/signup`, { ...user })
  })

  return <Context.Provider value={{}}>{children}</Context.Provider>
}

export const useAuth = () => useContext(Context)
