'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'

interface NavLinkProps {
  href: string
  children: React.ReactNode
}

export function NavLink({ href, children }: NavLinkProps) {
  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      <Link 
        href={href}
        className="px-4 py-2 text-sm font-medium text-purple-300 hover:text-white transition-colors relative group"
      >
        {children}
        <span className="absolute inset-x-0 -bottom-0.5 h-0.5 bg-purple-500 transform origin-left scale-x-0 group-hover:scale-x-100 transition-transform" />
      </Link>
    </motion.div>
  )
}

