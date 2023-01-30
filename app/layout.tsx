import './globals.css'

interface Props {
  children: React.ReactNode
}

const RootLayout = ({ children }: Props) => {
  return (
    <html lang='en'>
      <head />
      <body>{children}</body>
    </html>
  )
}

export default RootLayout
