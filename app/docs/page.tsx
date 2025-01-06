import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Code2, Cpu, Shield, Wallet, MessageSquare, Share2 } from 'lucide-react'

export default function Documentation() {
  return (
    <div className="min-h-screen bg-black text-white">
      <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-black to-blue-900/20" />
      
      <main className="relative container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto space-y-12">
          <div className="text-center space-y-4">
            <h1 className="text-5xl font-mono font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-blue-400">
              Documentation
            </h1>
            <p className="text-xl text-purple-200/80">
              Technical documentation and API references
            </p>
          </div>

          <div className="grid gap-8">
            {sections.map((section, index) => (
              <Card key={index} className="p-6 bg-black/50 border-purple-500/30">
                <div className="flex items-start gap-4">
                  <div className="p-3 rounded-lg bg-purple-500/10">
                    {section.icon}
                  </div>
                  <div className="space-y-4 flex-1">
                    <div className="flex items-center justify-between">
                      <h2 className="text-xl font-semibold text-purple-200">{section.title}</h2>
                      <Badge variant="secondary">{section.badge}</Badge>
                    </div>
                    <p className="text-gray-400">{section.description}</p>
                    <div className="space-y-2">
                      {section.topics.map((topic, topicIndex) => (
                        <div key={topicIndex} className="flex items-center gap-2 text-sm text-purple-300 hover:text-purple-200 cursor-pointer">
                          <span className="w-1.5 h-1.5 rounded-full bg-purple-400" />
                          {topic}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </main>
    </div>
  )
}

const sections = [
  {
    icon: <Code2 className="w-6 h-6 text-purple-400" />,
    title: "Getting Started",
    badge: "Basics",
    description: "Essential information to begin using ZarielAI's voice commands and social media integration.",
    topics: [
      "Installation & Setup",
      "Voice Command Basics",
      "Platform Authentication",
      "Quick Start Guide"
    ]
  },
  {
    icon: <Cpu className="w-6 h-6 text-purple-400" />,
    title: "AI Integration",
    badge: "Core",
    description: "Detailed documentation on ZarielAI's artificial intelligence capabilities and voice processing.",
    topics: [
      "Voice Recognition API",
      "Natural Language Processing",
      "Custom Command Creation",
      "AI Model Configuration"
    ]
  },
  {
    icon: <Share2 className="w-6 h-6 text-purple-400" />,
    title: "Social Media APIs",
    badge: "Integration",
    description: "Complete documentation for social media platform integration and automation.",
    topics: [
      "X (Twitter) API Integration",
      "Instagram Automation",
      "TikTok Content Management",
      "Cross-Platform Posting"
    ]
  },
  {
    icon: <Wallet className="w-6 h-6 text-purple-400" />,
    title: "Blockchain Integration",
    badge: "Web3",
    description: "Documentation for blockchain functionality, wallet management, and trading features.",
    topics: [
      "Wallet Generation",
      "Transaction Management",
      "Smart Contract Analysis",
      "Volume Analysis Tools"
    ]
  },
  {
    icon: <Shield className="w-6 h-6 text-purple-400" />,
    title: "Security",
    badge: "Essential",
    description: "Security best practices and implementation guides for safe usage of ZarielAI.",
    topics: [
      "Authentication & Authorization",
      "API Key Management",
      "Secure Storage",
      "Risk Management"
    ]
  },
  {
    icon: <MessageSquare className="w-6 h-6 text-purple-400" />,
    title: "Advanced Features",
    badge: "Pro",
    description: "Documentation for advanced features and customization options.",
    topics: [
      "Custom Automation Workflows",
      "Advanced Trading Strategies",
      "Sentiment Analysis",
      "Performance Optimization"
    ]
  }
]

