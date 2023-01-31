import FullScreenCard from '../(components)/FullScreenCard'
import LinkBearer from './LinkBearer'

interface Props {
  children: React.ReactNode
}

const Layout = ({ children }: Props) => {
  return (
    <FullScreenCard>
      <FullScreenCard.Body>{children}</FullScreenCard.Body>
      <FullScreenCard.BelowCard>
        <LinkBearer />
      </FullScreenCard.BelowCard>
    </FullScreenCard>
  )
}

export default Layout
