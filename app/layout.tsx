import './globals.css'
import Script from 'next/script'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <title>ZarielAI - Your Very Own Crypto AI Voice Assistant</title>
        <Script src="https://cdn.jsdelivr.net/npm/@solana/web3.js@latest" strategy="beforeInteractive" />
        <link rel="icon" href="/icon.png" />
      </head>
      <body className="min-h-screen bg-black text-white overflow-x-hidden">
        {children}
      </body>
    </html>
  )
}

