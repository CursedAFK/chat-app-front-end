'use client'

import { useMutation } from '@tanstack/react-query'
import { UseMutationResult } from '@tanstack/react-query/build/lib/types'
import axios, { AxiosResponse } from 'axios'
import { useRouter } from 'next/navigation'
import { useContext, createContext, useState, useEffect } from 'react'

interface User {
  id: string
  name: string
  image?: string
}

interface AuthContext {
  signup: UseMutationResult<AxiosResponse, unknown, User>
  login: UseMutationResult<{ token: string; user: User }, unknown, string>
}

interface AuthProviderProps {
  children: React.ReactNode
}

const Context = createContext<AuthContext | null>(null)

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<User>()
  const [token, setToken] = useState<string>()

  const router = useRouter()

  const signup = useMutation({
    mutationFn: (user: User) =>
      axios.post(`${process.env.NEXT_PUBLIC_SERVER_URL}/signup`, { ...user }),
    onSuccess: () => router.push('/login')
  })

  const login = useMutation({
    mutationFn: (id: string) =>
      axios
        .post(`${process.env.NEXT_PUBLIC_SERVER_URL}/login`, { id })
        .then(res => res.data as { token: string; user: User }),
    onSuccess: data => {
      setUser(data.user)
      setToken(data.token)
    }
  })

  useEffect(() => {
    if (token === null || user === null) return
    
  }, [token, user])

  return (
    <Context.Provider value={{ signup, login }}>{children}</Context.Provider>
  )
}

export const useAuth = () => useContext(Context) as AuthContext
