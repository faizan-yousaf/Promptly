import { ClerkProvider } from '@clerk/nextjs'
import { env } from '@/lib/env'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Promptly - AI Prompt Generator',
  description: 'Generate professional AI prompts with advanced reasoning and multilingual support.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <ClerkProvider
      publishableKey={env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY!}
    >
      <html lang="en">
        <body className={inter.className}>
          <div className="min-h-screen bg-black">
            {children}
          </div>
        </body>
      </html>
    </ClerkProvider>
  )
}
