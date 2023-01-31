import Link, { LinkProps } from 'next/link'

interface Props extends LinkProps {
  children: React.ReactNode
  className?: string
}

const Links = ({ children, className, ...rest }: Props) => {
  return (
    <Link
      className={`text-blue-500 underline underline-offset-2 ${className}`}
      {...rest}
    >
      {children}
    </Link>
  )
}

export default Links
