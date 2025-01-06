'use client'

import { useState, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Mic, Bot, Wallet, Terminal, Share2, TrendingUp, Shield, Search, BarChart2, MessageSquare, Twitter, Instagram, Music2, Repeat, AlertTriangle, PlusCircle, ArrowUpDown, ChevronRight, ArrowRight } from 'lucide-react'
import { AsciiPattern } from '@/components/ascii-pattern'
import { FuturisticTerminal } from '@/components/futuristic-terminal'
import { useToast } from '@/components/ui/use-toast'

const asciiArt = `
.           ..         .           .       .           .           .
      .         .            .          .       .
            .         ..xxxxxxxxxx....               .       .             .
    .             MWMWMWWMWMWMWMWMWMWMW                       .
              IIIIMWMWMWMWMWMWMWMWMWMWMWMttii:        .           .
 .      IIYVVXMWMWMWMWMWMWMWMWMWMWMWMWMWMWxx...         .           .
     IWMWMWMWMWMWMWMWMWMWMWMWMWMWMWMWMWMWMWMWMx..
   IIWMWMWMWMWMWMWMWBY%ZACH%AND%OWENMWMWMWMWMWMWMWMWMWMWMx..        .
    ""MWMWMWMWMWM"""""""".  .:..   ."""""MWMWMWMWMWti.
 .     ""   . \`  .: . :. : .  . :.  .  . . .  """"MWMWMWMWMti=
        . .   :\` . :   .  .'.' '....xxxxx...,'. '   ' ."""YWMWMWMWMWMWMW+
     ; . \` .  . : . .' :  . ..XXXXXXXXXXXXXXXXXXXXx.    \`     . "YWMWMWMWMWMWMW
.    .  .  .    . .   .  ..XXXXXXXXWWWWWWWWWWWWWWWWXXXX.  .     .     """""""
        ' :  : . : .  ...XXXXXWWW"   W88N88@888888WWWWWXX.   .   .       . .
   . ' .    . :   ...XXXXXXWWW"    M88N88GGGGGG888^8M "WMBX.          .   ..  :
         :     ..XXXXXXXXWWW"     M88888WWRWWWMW8oo88M   WWMX.     .    :    .
           "XXXXXXXXXXXXWW"       WN8888WWWWW  W8@@@8M    BMBRX.         .  : :
  .       XXXXXXXX=MMWW":  .      W8N888WWWWWWWW88888W      XRBRXX.  .       .
     ....  ""XXXXXMM::::. .        W8@889WWWWWM8@8N8W      . . :RRXx.    .
         \`\`...'''  MMM::.:.  .      W888N89999888@8W      . . ::::"RXV    .  :
 .       ..'''''      MMMm::.  .      WW888N88888WW     .  . mmMMMMMRXx
      ..' .            ""MMmm .  .       WWWWWWW   . :. :,miMM"""  : ""\`    .
   .                .       ""MMMMmm . .  .  .   ._,mMMMM"""  :  ' .  :
               .                  ""MMMMMMMMMMMMM""" .  : . '   .        .
          .              .     .    .                      .         .
.                                         .          .         .
`

export default function Home() {
  const [entered, setEntered] = useState(false)
  const [isTerminalOpen, setIsTerminalOpen] = useState(false)
  const [shouldSpeak, setShouldSpeak] = useState(false);
  const overviewRef = useRef<HTMLElement>(null)
  const featuresRef = useRef<HTMLElement>(null)
  const docsRef = useRef<HTMLElement>(null)

  const scrollToSection = (ref: React.RefObject<HTMLElement>) => {
    ref.current?.scrollIntoView({ behavior: 'smooth' })
  }

  const openTerminal = () => {
    setIsTerminalOpen(true);
    setShouldSpeak(true);
  };

  return (
    <div className="min-h-screen bg-black/90 text-white">
      <AsciiPattern />
      
      <AnimatePresence mode="wait">
        {!entered ? (
          <motion.div
            key="enter"
            className="fixed inset-0 flex items-center justify-center z-20"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="text-center space-y-8">
              <motion.pre
                className="text-purple-300 text-xs leading-none font-mono"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8 }}
              >
                {asciiArt}
              </motion.pre>
              <motion.h1 
                className="text-5xl font-mono font-bold tracking-tight"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
              >
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-300 via-purple-200 to-purple-300">
                  PROOF OF SENTIENCE
                </span>
              </motion.h1>
              
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8 }}
              >
                <Button 
                  onClick={() => setEntered(true)}
                  className="bg-purple-500/20 text-purple-200 hover:bg-purple-500/30 border border-purple-500/50 px-8 py-6 text-lg font-mono"
                >
                  {'> ENTER <'}
                </Button>
              </motion.div>
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="content"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="relative z-10"
          >
            <MainContent 
              overviewRef={overviewRef}
              featuresRef={featuresRef}
              docsRef={docsRef}
              scrollToSection={scrollToSection}
              isTerminalOpen={isTerminalOpen}
              setIsTerminalOpen={setIsTerminalOpen}
              shouldSpeak={shouldSpeak}
              setShouldSpeak={setShouldSpeak}
              openTerminal={openTerminal}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

function MainContent({ overviewRef, featuresRef, docsRef, scrollToSection, isTerminalOpen, setIsTerminalOpen, shouldSpeak, setShouldSpeak, openTerminal }) {
  const { toast, Toasts } = useToast()

  return (
    <div className="min-h-screen">
      <header className="fixed top-0 w-full z-50 bg-black/80 backdrop-blur-sm border-b border-purple-300/10">
        <nav className="container mx-auto px-4 h-16 flex items-center justify-between">
          <span className="text-lg font-mono text-purple-300">ZARIEL.AI</span>
          <div className="flex items-center gap-6">
            <Button
              variant="ghost"
              className="text-purple-300 hover:text-purple-100 hover:bg-purple-500/10"
              onClick={() => scrollToSection(overviewRef)}
            >
              Overview
            </Button>
            <Button
              variant="ghost"
              className="text-purple-300 hover:text-purple-100 hover:bg-purple-500/10"
              onClick={() => scrollToSection(featuresRef)}
            >
              Features
            </Button>
            <Button
              variant="ghost"
              className="text-purple-300 hover:text-purple-100 hover:bg-purple-500/10"
              onClick={() => scrollToSection(docsRef)}
            >
              Docs
            </Button>
          </div>
        </nav>
      </header>

      <main className="mx-auto px-4 py-32 space-y-32 w-full max-w-[80%] relative z-20">
        <section ref={overviewRef}>
          <Hero setIsTerminalOpen={openTerminal} />
        </section>
        <section ref={featuresRef}>
          <Features />
        </section>
        <AdvancedFeatures />
        <TerminalDemo />
        <section ref={docsRef}>
          <Documentation />
        </section>
        <CTA setIsTerminalOpen={openTerminal}/>
      </main>
      <FuturisticTerminal 
        isOpen={isTerminalOpen} 
        onClose={() => setIsTerminalOpen(false)} 
        onOpen={() => setShouldSpeak(true)}
        shouldSpeak={shouldSpeak}
        setShouldSpeak={setShouldSpeak}
      />
      <Toasts />
    </div>
  )
}

function Hero({ setIsTerminalOpen }) {
  return (
    <section className="text-center space-y-8">
      <div className="p-8 rounded-lg backdrop-blur-sm">
        <div className="space-y-6">
          <h1 className="text-6xl font-mono font-bold tracking-tight">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-300 via-purple-200 to-purple-300">
              Voice-Powered AI Agent
            </span>
          </h1>
          <p className="text-xl text-purple-300/80 max-w-2xl mx-auto font-mono">
            Control social media automation and blockchain operations with natural voice commands
          </p>
        </div>

        <div className="flex items-center justify-center gap-4">
          <Badge variant="secondary" className="px-4 py-1 bg-purple-500/10 text-purple-200">
            <span className="w-2 h-2 rounded-full bg-purple-400 inline-block mr-2" />
            AI Powered
          </Badge>
          <Badge variant="secondary" className="px-4 py-1 bg-purple-500/10 text-purple-200">
            <span className="w-2 h-2 rounded-full bg-green-400 inline-block mr-2" />
            Multi-Chain
          </Badge>
        </div>

        <VoiceInterface setIsTerminalOpen={setIsTerminalOpen} />
      </div>
    </section>
  )
}

function VoiceInterface({ setIsTerminalOpen }) {
  return (
    <Card className="max-w-2xl mx-auto mt-8 bg-purple-500/5 border-purple-500/20 backdrop-blur-sm bg-black/30">
      <div className="p-8 space-y-6">
        <div className="flex items-center justify-center">
          <div className="relative">
            <div className="w-24 h-24 rounded-full bg-purple-500/20 flex items-center justify-center">
              <Mic className="w-12 h-12 text-purple-300" />
            </div>
            <div className="absolute inset-0 rounded-full border-4 border-purple-500/40 animate-pulse" />
          </div>
        </div>
        <p className="text-center text-purple-300/70 font-mono">
          "Generate a thread about AI trends and post it across my social media..."
        </p>
        <div className="flex justify-center">
          <Button 
            className="bg-purple-500/20 text-purple-200 hover:bg-purple-500/30 border border-purple-500/50"
            onClick={setIsTerminalOpen}
          >
            Try Now
          </Button>
        </div>
      </div>
    </Card>
  )
}

function Features() {
  const features = [
    {
      icon: <Twitter className="w-6 h-6" />,
      title: "Social Media Automation",
      description: "Post and engage across X, Instagram, and TikTok with voice commands"
    },
    {
      icon: <Shield className="w-6 h-6" />,
      title: "Smart Contract Analysis",
      description: "Instant rug pull detection and security analysis of smart contracts"
    },
    {
      icon: <TrendingUp className="w-6 h-6" />,
      title: "Market Intelligence",
      description: "Real-time tracking of trending tokens and social sentiment"
    },
    {
      icon: <Wallet className="w-6 h-6" />,
      title: "Wallet Operations",
      description: "Generate wallets, bundle transactions, and manage operations across chains"
    },
    {
      icon: <BarChart2 className="w-6 h-6" />,
      title: "Volume Analysis",
      description: "Track and analyze trading volumes with artificial boosting detection"
    },
    {
      icon: <MessageSquare className="w-6 h-6" />,
      title: "Content Generation",
      description: "AI-powered content creation optimized for each platform"
    }
  ]

  return (
    <section className="space-y-12">
      <div className="text-center space-y-4">
        <h2 className="text-3xl font-mono font-bold text-purple-200">Features</h2>
        <p className="text-purple-300/70 max-w-2xl mx-auto">
          Comprehensive tools for social media management and blockchain operations
        </p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {features.map((feature, index) => (
          <Card 
            key={index}
            className="bg-purple-500/5 border-purple-500/20 backdrop-blur-sm bg-black/30 hover:border-purple-500/40 transition-colors"
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

function AdvancedFeatures() {
  const features = [
    {
      title: "Cross-Platform Integration",
      description: "Seamlessly manage content across X, Instagram, TikTok, and emerging platforms",
      items: [
        "Unified dashboard for all social accounts",
        "Cross-platform analytics and insights",
        "Automated content adaptation for each platform"
      ]
    },
    {
      title: "Blockchain Security Suite",
      description: "Comprehensive tools for secure and efficient blockchain operations",
      items: [
        "Multi-signature wallet support",
        "Real-time transaction monitoring",
        "Automated auditing of smart contracts"
      ]
    },
    {
      title: "AI-Driven Market Analysis",
      description: "Stay ahead with cutting-edge AI analysis of market trends and sentiment",
      items: [
        "Predictive analytics for token performance",
        "Sentiment analysis across social and news platforms",
        "Automated trading strategy suggestions"
      ]
    },
    {
      title: "Voice-Activated Workflow Automation",
      description: "Streamline your operations with advanced voice-controlled automations",
      items: [
        "Custom voice command creation",
        "Conditional logic in voice workflows",
        "Integration with popular productivity tools"
      ]
    }
  ]

  return (
    <section className="space-y-12">
      <div className="text-center space-y-4">
        <h2 className="text-3xl font-mono font-bold text-purple-200">Advanced Capabilities</h2>
        <p className="text-purple-300/70 max-w-2xl mx-auto">
          Unlock the full potential of AI-driven social media and blockchain management
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        {features.map((feature, index) => (
          <Card 
            key={index}
            className="bg-purple-500/5 border-purple-500/20 backdrop-blur-sm bg-black/30 hover:border-purple-500/40 transition-colors"
          >
            <div className="p-6 space-y-4">
              <h3 className="text-xl font-semibold text-purple-200 font-mono">{feature.title}</h3>
              <p className="text-sm text-purple-300/70">{feature.description}</p>
              <ul className="space-y-2">
                {feature.items.map((item, itemIndex) => (
                  <li key={itemIndex} className="flex items-start gap-2 text-sm text-purple-300/70">
                    <ArrowRight className="w-4 h-4 mt-1 text-purple-400" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </Card>
        ))}
      </div>
    </section>
  )
}

function TerminalDemo() {
  return (
    <section className="space-y-8">
      <div className="grid gap-6">
        <Card className="bg-purple-500/5 border-purple-500/20 backdrop-blur-sm bg-black/30">
          <div className="border-b border-purple-500/20 p-4 flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-purple-500/40" />
            <div className="w-3 h-3 rounded-full bg-purple-500/40" />
            <div className="w-3 h-3 rounded-full bg-purple-500/40" />
          </div>
          <div className="p-6 font-mono text-purple-300 space-y-4">
            <div className="flex items-center gap-2">
              <Terminal className="w-4 h-4" />
              <span className="text-purple-400">$</span>
              <span className="typing-animation">zariel analyze-contract 0x742d35Cc6634C0532925a3b844Bc454e4438f44e</span>
            </div>
            <div className="text-purple-300/70 pl-6">
              {'>'} Analyzing smart contract...<br />
              {'>'} Checking ownership patterns...<br />
              {'>'} Scanning for known vulnerabilities...<br />
              {'>'} Analyzing token distribution...
            </div>
            <div className="space-y-2 pl-6">
              <div className="text-yellow-400/70">
                ⚠ Warning: Centralized ownership detected
              </div>
              <div className="text-red-400/70">
                ⚠ High Risk: Potential rug pull indicators found
              </div>
              <div className="text-purple-300/70">
                {'>'} Generating detailed report...
              </div>
            </div>
          </div>
        </Card>

        <Card className="bg-purple-500/5 border-purple-500/20 backdrop-blur-sm bg-black/30">
          <div className="border-b border-purple-500/20 p-4 flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-purple-500/40" />
            <div className="w-3 h-3 rounded-full bg-purple-500/40" />
            <div className="w-3 h-3 rounded-full bg-purple-500/40" />
          </div>
          <div className="p-6 font-mono text-purple-300 space-y-4">
            <div className="flex items-center gap-2">
              <Terminal className="w-4 h-4" />
              <span className="text-purple-400">$</span>
              <span className="typing-animation">zariel generate-content "Latest AI developments in crypto"</span>
            </div>
            <div className="text-purple-300/70 pl-6">
              {'>'} Analyzing trending topics...<br />
              {'>'} Generating optimized content...<br />
              {'>'} Adapting for multiple platforms...
            </div>
            <div className="grid gap-2 pl-6">
              <div className="flex items-center gap-2 text-blue-400/70">
                <Twitter className="w-4 h-4" /> Thread generated (12 tweets)
              </div>
              <div className="flex items-center gap-2 text-pink-400/70">
                <Instagram className="w-4 h-4" /> Carousel post created
              </div>
              <div className="flex items-center gap-2 text-purple-300/70">
                <Music2 className="w-4 h-4" /> TikTok script prepared
              </div>
            </div>
          </div>
        </Card>
      </div>
    </section>
  )
}

function Documentation() {
  const sections = [
    {
      title: "Voice Commands",
      items: [
        "Social media posting",
        "Content generation",
        "Market analysis",
        "Wallet operations"
      ]
    },
    {
      title: "Blockchain Tools",
      items: [
        "Contract analysis",
        "Rug pull detection",
        "Volume tracking",
        "Transaction bundling"
      ]
    },
    {
      title: "Social Integration",
      items: [
        "Multi-platform posting",
        "Engagement tracking",
        "Content optimization",
        "Analytics dashboard"
      ]
    },
    {
      title: "Security",
      items: [
        "Wallet generation",
        "Transaction signing",
        "Contract verification",
        "Risk assessment"
      ]
    }
  ]

  return (
    <section className="space-y-12">
      <div className="text-center space-y-4">
        <h2 className="text-3xl font-mono font-bold text-purple-200">Documentation</h2>
        <p className="text-purple-300/70 max-w-2xl mx-auto">
          Comprehensive guides and API documentation
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {sections.map((section) => (
          <Card 
            key={section.title}
            className="bg-purple-500/5 border-purple-500/20 backdrop-blur-sm bg-black/30 hover:border-purple-500/40 transition-colors p-6"
          >
            <h3 className="text-lg font-mono text-purple-200 mb-4">{section.title}</h3>
            <div className="space-y-2">
              {section.items.map((item) => (
                <div key={item} className="flex items-center gap-2 text-purple-300/70 hover:text-purple-300 cursor-pointer group">
                  <ChevronRight className="w-4 h-4 text-purple-500 group-hover:translate-x-1 transition-transform" />
                  <span className="text-sm">{item}</span>
                </div>
              ))}
            </div>
          </Card>
        ))}
      </div>

      <Card className="bg-purple-500/5 border-purple-500/20 backdrop-blur-sm bg-black/30 p-6">
        <div className="space-y-4">
          <h3 className="text-lg font-mono text-purple-200">Repository Structure</h3>
          <pre className="text-sm text-purple-300/70 font-mono overflow-x-auto">
{`zariel-ai/
├── src/
│   ├── ai/
│   │   ├── voice/          # Voice processing and commands
│   │   ├── nlp/           # Natural language processing
│   │   └── generation/    # Content generation models
│   ├── blockchain/
│   │   ├── analysis/      # Contract and volume analysis
│   │   ├── wallets/       # Wallet management
│   │   └── transactions/  # Transaction bundling
│   ├── social/
│   │   ├── twitter/       # X (Twitter) integration
│   │   ├── instagram/     # Instagram automation
│   │   └── tiktok/        # TikTok content management
│   └── utils/
│       ├── security/      # Security utilities
│       └── analytics/     # Data analysis tools
└── api/                   # API endpoints`}</pre>
        </div>
      </Card>
    </section>
  )
}

function CTA({ setIsTerminalOpen }) {
  return (
    <section className="space-y-8 text-center">
      <h2 className="text-4xl font-mono font-bold text-purple-200">Ready to Revolutionize Your Web3 Experience?</h2>
      <p className="text-xl text-purple-300/80 max-w-2xl mx-auto">
        Join the future of AI-powered social media and blockchain management.
      </p>
      <Button 
        className="bg-purple-500/20 text-purple-200 hover:bg-purple-500/30 border border-purple-500/50 px-8 py-4 text-lg"
        onClick={setIsTerminalOpen}
      >
        Get Started Now
      </Button>
    </section>
  )
}

