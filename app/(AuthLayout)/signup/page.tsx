'use client'

import Button from '@/app/(components)/Button'
import Input from '@/app/(components)/Input'
import { useRef } from 'react'

const Signup = () => {
  const usernameRef = useRef<HTMLInputElement>(null)
  const nameRef = useRef<HTMLInputElement>(null)
  const imageUrlRef = useRef<HTMLInputElement>(null)

  return (
    <>
      <h1 className='text-3xl font-bold mb-8 text-center'>Sign Up</h1>
      <form className='grid grid-cols-[auto,1fr] gap-x-3 gap-y-5 items-center justify-items-end'>
        <label htmlFor='userName'>Username</label>
        <Input id='userName' pattern='\S*' required ref={usernameRef} />
        <label htmlFor='name'>Name</label>
        <Input id='name' required ref={nameRef} />
        <label htmlFor='imageUrl'>Image Url</label>
        <Input id='imageUrl' type='url' ref={imageUrlRef} />
        <Button className='col-span-full' type='submit'>
          Sign Up
        </Button>
      </form>
    </>
  )
}

export default Signup
