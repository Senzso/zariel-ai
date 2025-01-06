'use client'

import { useState, useEffect } from 'react'
import { usePathname } from 'next/navigation'
import { Button } from "@/components/ui/button"
import Link from 'next/link'

export default function HomeLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [scrolled, setScrolled] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <div>
      <header className={`fixed top-0 w-full z-50 transition-all duration-300 ${scrolled ? 'bg-black/80 backdrop-blur-sm border-b border-purple-300/10' : ''}`}>
        <nav className="container mx-auto px-4 h-16 flex items-center justify-between">
          <Link href="/home" className="text-lg font-mono text-purple-300 hover:text-purple-200">ZARIEL.AI</Link>
          <div className="flex items-center gap-6">
            {[
              { name: 'Overview', path: '/home' },
              { name: 'Features', path: '/home/features' },
              { name: 'Docs', path: '/home/docs' }
            ].map((item) => (
              <Link key={item.name} href={item.path}>
                <Button
                  variant="ghost"
                  className={`text-purple-300 hover:text-purple-100 hover:bg-purple-500/10 
                    ${pathname === item.path ? 'bg-purple-500/10' : ''}`}
                >
                  {item.name}
                </Button>
              </Link>
            ))}
          </div>
        </nav>
      </header>

      <main className="pt-16">
        {children}
      </main>
    </div>
  )
}

