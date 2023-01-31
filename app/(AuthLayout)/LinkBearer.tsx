'use client'

import { usePathname } from 'next/navigation'
import Links from '../(components)/Links'

const LinkBearer = () => {
  const pathname = usePathname()

  return (
    <Links href={pathname === '/login' ? '/signup' : '/login'}>
      {pathname === '/login' ? 'Create Account' : 'Login'}
    </Links>
  )
}

export default LinkBearer
