'use client'

import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import { useAuth } from './(context)/AuthContext'

interface Props {
  children: React.ReactNode
}

const AuthWrapper = ({ children }: Props) => {
  const { user } = useAuth()

  const router = useRouter()

  useEffect(() => {
    if (!user) router.push('/login')
  }, [])

  return <>{user ? children : <></>}</>
}

export default AuthWrapper
