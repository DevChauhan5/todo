import Navbar from '@/components/Navbar'
import './globals.css'

export const metadata = {
  title: 'Todo',
  description: 'The One & Only Todo App',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        {children}
        </body>
    </html>
  )
}
