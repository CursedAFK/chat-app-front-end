import { AuthProvider } from './(context)/AuthContext'
import QueryWrapper from './(context)/QueryWrapper'
import './globals.css'

interface Props {
  children: React.ReactNode
}

const RootLayout = ({ children }: Props) => {
  return (
    <html lang='en'>
      <head />
      <body>
        <QueryWrapper>
          <AuthProvider>{children}</AuthProvider>
        </QueryWrapper>
      </body>
    </html>
  )
}

export default RootLayout
