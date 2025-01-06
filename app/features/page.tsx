import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Twitter, Instagram, Music2, Shield, TrendingUp, MessageSquare, Wallet, BarChartIcon as ChartBar, Bot, Share2 } from 'lucide-react'

export default function Features() {
  return (
    <div className="min-h-screen bg-black text-white">
      <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-black to-blue-900/20" />
      
      <main className="relative container mx-auto px-4 py-16">
        <div className="max-w-6xl mx-auto space-y-12">
          <div className="text-center space-y-4">
            <h1 className="text-5xl font-mono font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-blue-400">
              Features
            </h1>
            <p className="text-xl text-purple-200/80">
              Comprehensive AI-powered tools for social media and blockchain management
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, index) => (
              <Card key={index} className="p-6 bg-black/50 border-purple-500/30 hover:border-purple-500/60 transition-colors">
                <div className="space-y-4">
                  <div className="p-3 w-fit rounded-lg bg-purple-500/10">
                    {feature.icon}
                  </div>
                  <h3 className="text-lg font-semibold text-purple-200">{feature.title}</h3>
                  <p className="text-sm text-gray-400">{feature.description}</p>
                  <Button variant="ghost" className="text-purple-400 hover:text-purple-300">
                    Learn more
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </main>
    </div>
  )
}

const features = [
  {
    icon: <Twitter className="w-6 h-6 text-purple-400" />,
    title: "X Integration",
    description: "Automated posting, engagement tracking, and trend analysis on X (formerly Twitter)."
  },
  {
    icon: <Instagram className="w-6 h-6 text-purple-400" />,
    title: "Instagram Management",
    description: "Content scheduling, story automation, and engagement optimization for Instagram."
  },
  {
    icon: <Music2 className="w-6 h-6 text-purple-400" />,
    title: "TikTok Automation",
    description: "Trend-aware content creation and posting automation for TikTok."
  },
  {
    icon: <Shield className="w-6 h-6 text-purple-400" />,
    title: "Security Analysis",
    description: "Smart contract auditing and rug pull detection for crypto projects."
  },
  {
    icon: <TrendingUp className="w-6 h-6 text-purple-400" />,
    title: "Trend Detection",
    description: "Real-time analysis of trending tokens and social sentiment."
  },
  {
    icon: <MessageSquare className="w-6 h-6 text-purple-400" />,
    title: "Voice Commands",
    description: "Natural language processing for hands-free operation and task execution."
  },
  {
    icon: <Wallet className="w-6 h-6 text-purple-400" />,
    title: "Wallet Management",
    description: "Secure wallet generation and transaction management across chains."
  },
  {
    icon: <ChartBar className="w-6 h-6 text-purple-400" />,
    title: "Volume Analysis",
    description: "Advanced analytics for trading volume and market manipulation detection."
  },
  {
    icon: <Bot className="w-6 h-6 text-purple-400" />,
    title: "AI Assistant",
    description: "24/7 automated support for social media and blockchain operations."
  }
]

