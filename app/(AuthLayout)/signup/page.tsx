'use client'

import { FormEvent, useRef } from 'react'
import { useAuth } from '@/app/(context)/AuthContext'
import Input from '@/app/(components)/Input'
import Button from '@/app/(components)/Button'

const Signup = () => {
  const { signup } = useAuth()

  const usernameRef = useRef<HTMLInputElement>(null)
  const nameRef = useRef<HTMLInputElement>(null)
  const imageUrlRef = useRef<HTMLInputElement>(null)

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()

    if (signup.isLoading) return

    const username = usernameRef.current?.value
    const name = nameRef.current?.value!
    const imageUrl = imageUrlRef.current?.value

    if (username === null || username === '' || name === null || name === '')
      return

    signup.mutate({ id: username!, name, image: imageUrl })
  }

  return (
    <>
      <h1 className='text-3xl font-bold mb-8 text-center'>Sign Up</h1>
      <form
        onSubmit={handleSubmit}
        className='grid grid-cols-[auto,1fr] gap-x-3 gap-y-5 items-center justify-items-end'
      >
        <label htmlFor='userName'>Username</label>
        <Input id='userName' pattern='\S*' required ref={usernameRef} />
        <label htmlFor='name'>Name</label>
        <Input id='name' required ref={nameRef} />
        <label htmlFor='imageUrl'>Image Url</label>
        <Input id='imageUrl' type='url' ref={imageUrlRef} />
        <Button
          className='col-span-full'
          type='submit'
          disabled={signup.isLoading}
        >
          {signup.isLoading ? 'Loading...' : 'Sign Up'}
        </Button>
      </form>
    </>
  )
}

export default Signup
