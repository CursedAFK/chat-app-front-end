'use client'

import { useMutation } from '@tanstack/react-query'
import { UseMutationResult } from '@tanstack/react-query/build/lib/types'
import axios, { AxiosResponse } from 'axios'
import { useRouter } from 'next/navigation'
import { useContext, createContext, useState, useEffect } from 'react'
import { StreamChat } from 'stream-chat'
import 'stream-chat-react/dist/css/index.css'

interface User {
  id: string
  name: string
  image?: string
}

interface AuthContext {
  signup: UseMutationResult<AxiosResponse, unknown, User>
  login: UseMutationResult<{ token: string; user: User }, unknown, string>
  user?: User
  streamChat?: StreamChat
}

interface AuthProviderProps {
  children: React.ReactNode
}

const Context = createContext<AuthContext | null>(null)

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<User>()
  const [token, setToken] = useState<string>()
  const [streamChat, setStreamChat] = useState<StreamChat>()

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

    const chat = new StreamChat(process.env.NEXT_PUBLIC_STREAM_API_KEY!)

    if (chat.tokenManager.token === token && chat.userID === user?.id) return

    let isInterrupted = false
    // @ts-ignore
    const connectPromise = chat.connectUser(user, token).then(() => {
      if (isInterrupted) return
      setStreamChat(chat)
    })

    return () => {
      isInterrupted = true
      setStreamChat(undefined)

      connectPromise.then(() => {
        chat.disconnectUser()
      })
    }
  }, [token, user])

  useEffect(() => {
    console.log(user)
  }, [user])

  return (
    <Context.Provider
      value={{
        signup,
        login,
        user,
        streamChat
      }}
    >
      {children}
    </Context.Provider>
  )
}

export const useAuth = () => useContext(Context) as AuthContext
