'use client'

import { FormEvent, useRef } from 'react'
import { useAuth } from '@/app/(context)/AuthContext'
import Input from '@/app/(components)/Input'
import Button from '@/app/(components)/Button'

const Login = () => {
  const { login } = useAuth()

  const usernameRef = useRef<HTMLInputElement>(null)

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()

    if (login.isLoading) return

    const username = usernameRef.current?.value

    if (username === null || username === '') return

    login.mutate(username!)
  }

  return (
    <>
      <h1 className='text-3xl font-bold mb-8 text-center'>Log In</h1>
      <form
        onSubmit={handleSubmit}
        className='grid grid-cols-[auto,1fr] gap-x-3 gap-y-5 items-center justify-items-end'
      >
        <label htmlFor='userName'>Username</label>
        <Input id='userName' required ref={usernameRef} />
        <Button
          className='col-span-full'
          type='submit'
          disabled={login.isLoading}
        >
          {login.isLoading ? 'Loading...' : 'Log In'}
        </Button>
      </form>
    </>
  )
}

export default Login
