'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { AsciiPattern } from './components/ascii-pattern'
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Mic, Bot, Wallet, Terminal, Share2 } from 'lucide-react'

export default function Home() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <div className="min-h-screen bg-black text-white overflow-hidden">
      <div className="fixed inset-0 bg-gradient-to-br from-purple-900/10 via-black to-purple-900/10" />
      <AsciiPattern />
      
      <header className={`fixed top-0 w-full z-50 transition-all duration-300 ${scrolled ? 'bg-black/80 backdrop-blur-sm border-b border-purple-300/10' : ''}`}>
        <nav className="container mx-auto px-4 h-16 flex items-center justify-between">
          <span className="text-lg font-mono text-purple-300">ZARIEL.AI</span>
          <div className="flex items-center gap-6">
            {['Overview', 'Features', 'Docs'].map((item) => (
              <Button
                key={item}
                variant="ghost"
                className="text-purple-300 hover:text-purple-100 hover:bg-purple-500/10"
              >
                {item}
              </Button>
            ))}
          </div>
        </nav>
      </header>

      <main className="relative pt-32 pb-16">
        <div className="container mx-auto px-4 space-y-32">
          <Hero />
          <Features />
          <Terminal />
          <Docs />
        </div>
      </main>
    </div>
  )
}

function Hero() {
  return (
    <section className="text-center space-y-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="space-y-6"
      >
        <h1 className="text-7xl font-mono font-bold tracking-tight">
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-300 via-purple-200 to-purple-300">
            PROOF OF SENTIENCE
          </span>
        </h1>
        <p className="text-xl text-purple-300/80 max-w-2xl mx-auto font-mono">
          Voice-powered AI for social media automation and blockchain analysis
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
        className="flex items-center justify-center gap-4"
      >
        <Badge variant="secondary" className="px-4 py-1 bg-purple-500/10 text-purple-200">
          <span className="w-2 h-2 rounded-full bg-purple-400 inline-block mr-2" />
          AI Powered
        </Badge>
        <Button className="bg-purple-500/20 text-purple-200 hover:bg-purple-500/30 border border-purple-500/50">
          Get Started
        </Button>
      </motion.div>
    </section>
  )
}

function Features() {
  const features = [
    {
      icon: <Mic className="w-6 h-6" />,
      title: "Voice Commands",
      description: "Control your social media presence with natural voice interactions"
    },
    {
      icon: <Bot className="w-6 h-6" />,
      title: "AI Assistant",
      description: "Intelligent automation for content creation and engagement"
    },
    {
      icon: <Wallet className="w-6 h-6" />,
      title: "Blockchain Tools",
      description: "Advanced analytics and security for Web3 transactions"
    },
    {
      icon: <Share2 className="w-6 h-6" />,
      title: "Cross-Platform",
      description: "Seamless integration with major social media platforms"
    }
  ]

  return (
    <section className="space-y-12">
      <div className="text-center">
        <h2 className="text-3xl font-mono font-bold text-purple-200">Features</h2>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
        {features.map((feature, index) => (
          <Card 
            key={index}
            className="bg-purple-500/5 border-purple-500/20 hover:border-purple-500/40 transition-colors"
          >
            <div className="p-6 space-y-4">
              <div className="p-3 w-fit rounded-lg bg-purple-500/10 text-purple-300">
                {feature.icon}
              </div>
              <h3 className="text-lg font-semibold text-purple-200 font-mono">{feature.title}</h3>
              <p className="text-sm text-purple-300/70">{feature.description}</p>
            </div>
          </Card>
        ))}
      </div>
    </section>
  )
}

function Terminal() {
  return (
    <section className="space-y-8">
      <Card className="bg-purple-500/5 border-purple-500/20">
        <div className="border-b border-purple-500/20 p-4 flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-purple-500/40" />
          <div className="w-3 h-3 rounded-full bg-purple-500/40" />
          <div className="w-3 h-3 rounded-full bg-purple-500/40" />
        </div>
        <div className="p-6 font-mono text-purple-300 space-y-4">
          <div className="flex items-center gap-2">
            <Terminal className="w-4 h-4" />
            <span className="text-purple-400">$</span>
            <span className="typing-animation">zariel --voice "Post about AI trends on X and Instagram"</span>
          </div>
          <div className="text-purple-300/70 pl-6">
            > Analyzing current AI trends...<br />
            > Generating optimized content...<br />
            > Scheduling posts across platforms...
          </div>
          <div className="text-green-400/70 pl-6">
            ✓ Posts scheduled successfully
          </div>
        </div>
      </Card>
    </section>
  )
}

function Docs() {
  return (
    <section className="space-y-12">
      <div className="text-center">
        <h2 className="text-3xl font-mono font-bold text-purple-200">Documentation</h2>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {['Voice Commands', 'Social Media', 'Blockchain', 'Security'].map((topic) => (
          <Card 
            key={topic}
            className="bg-purple-500/5 border-purple-500/20 hover:border-purple-500/40 transition-colors p-6"
          >
            <h3 className="text-lg font-mono text-purple-200 mb-4">{topic}</h3>
            <div className="space-y-2 text-purple-300/70">
              <p className="text-sm">Learn more about {topic.toLowerCase()} integration →</p>
            </div>
          </Card>
        ))}
      </div>
    </section>
  )
}

