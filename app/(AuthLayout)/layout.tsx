import FullScreenCard from '../(components)/FullScreenCard'

interface Props {
  children: React.ReactNode
}

const Layout = ({ children }: Props) => {
  return (
    <FullScreenCard>
      <FullScreenCard.Body>{children}</FullScreenCard.Body>
      <FullScreenCard.BelowCard>Hi</FullScreenCard.BelowCard>
    </FullScreenCard>
  )
}

export default Layout
