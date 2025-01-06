import { Badge } from "@/components/ui/badge"
import { Card } from "@/components/ui/card"
import { Sparkles, Mic, Bot, Wallet } from 'lucide-react'

export default function Overview() {
  return (
    <div className="min-h-screen bg-black text-white">
      <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-black to-blue-900/20" />
      
      <main className="relative container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto space-y-12">
          <div className="text-center space-y-4">
            <h1 className="text-5xl font-mono font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-blue-400">
              Overview
            </h1>
            <p className="text-xl text-purple-200/80">
              ZarielAI: Your Voice-Powered Web3 Social Media Assistant
            </p>
          </div>

          <div className="grid gap-8">
            <Card className="p-6 bg-black/50 border-purple-500/30">
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-lg bg-purple-500/10">
                  <Mic className="w-6 h-6 text-purple-400" />
                </div>
                <div className="space-y-2">
                  <h2 className="text-xl font-semibold text-purple-200">Voice-First Interface</h2>
                  <p className="text-gray-400">
                    Simply speak your commands and watch ZarielAI execute complex tasks across social media and blockchain platforms. Natural language processing ensures accurate interpretation of your intentions.
                  </p>
                </div>
              </div>
            </Card>

            <Card className="p-6 bg-black/50 border-purple-500/30">
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-lg bg-purple-500/10">
                  <Bot className="w-6 h-6 text-purple-400" />
                </div>
                <div className="space-y-2">
                  <h2 className="text-xl font-semibold text-purple-200">Multi-Platform Integration</h2>
                  <p className="text-gray-400">
                    Seamlessly manage your presence across X, TikTok, and Instagram. Generate and schedule content, analyze performance, and maintain consistent branding across all platforms.
                  </p>
                </div>
              </div>
            </Card>

            <Card className="p-6 bg-black/50 border-purple-500/30">
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-lg bg-purple-500/10">
                  <Wallet className="w-6 h-6 text-purple-400" />
                </div>
                <div className="space-y-2">
                  <h2 className="text-xl font-semibold text-purple-200">Web3 Intelligence</h2>
                  <p className="text-gray-400">
                    Advanced blockchain analytics and automation. From wallet generation to rug pull detection, ZarielAI provides comprehensive Web3 security and optimization tools.
                  </p>
                </div>
              </div>
            </Card>

            <Card className="p-6 bg-black/50 border-purple-500/30">
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-lg bg-purple-500/10">
                  <Sparkles className="w-6 h-6 text-purple-400" />
                </div>
                <div className="space-y-2">
                  <h2 className="text-xl font-semibold text-purple-200">Smart Automation</h2>
                  <p className="text-gray-400">
                    Leverage AI-powered automation for social media engagement, transaction bundling, and volume analysis. Let ZarielAI handle the complexity while you focus on strategy.
                  </p>
                </div>
              </div>
            </Card>
          </div>

          <div className="flex flex-wrap justify-center gap-4">
            <Badge variant="secondary" className="px-4 py-2">Real-time Analysis</Badge>
            <Badge variant="secondary" className="px-4 py-2">Voice Commands</Badge>
            <Badge variant="secondary" className="px-4 py-2">Multi-chain Support</Badge>
            <Badge variant="secondary" className="px-4 py-2">Social Automation</Badge>
          </div>
        </div>
      </main>
    </div>
  )
}

