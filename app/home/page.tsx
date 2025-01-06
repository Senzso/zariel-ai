'use client'

import { motion } from 'framer-motion'
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Mic, Bot, Wallet, Terminal } from 'lucide-react'

export default function Home() {
  return (
    <div className="space-y-32 py-16">
      <Hero />
      <Features />
      <TerminalDemo />
    </div>
  )
}

function Hero() {
  return (
    <section className="container mx-auto px-4 text-center space-y-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="space-y-6"
      >
        <h1 className="text-6xl font-mono font-bold tracking-tight">
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-300 via-purple-200 to-purple-300">
            Voice-Powered AI Assistant
          </span>
        </h1>
        <p className="text-xl text-purple-300/80 max-w-2xl mx-auto font-mono">
          Control your social media and blockchain operations with natural voice commands
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
    }
  ]

  return (
    <section className="container mx-auto px-4 space-y-12">
      <div className="text-center">
        <h2 className="text-3xl font-mono font-bold text-purple-200">Features</h2>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
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

function TerminalDemo() {
  return (
    <section className="container mx-auto px-4">
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
            {'>'} Analyzing current AI trends...<br />
            {'>'} Generating optimized content...<br />
            {'>'} Scheduling posts across platforms...
          </div>
          <div className="text-green-400/70 pl-6">
            ✓ Posts scheduled successfully
          </div>
        </div>
      </Card>
    </section>
  )
}

