import { Card } from "@/components/ui/card"
import { FolderTree } from 'lucide-react'

export default function RepositoryStructure() {
  return (
    <div className="min-h-screen bg-black text-white">
      <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-black to-blue-900/20" />
      
      <main className="relative container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto space-y-12">
          <div className="text-center space-y-4">
            <h1 className="text-5xl font-mono font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-blue-400">
              Repository Structure
            </h1>
            <p className="text-xl text-purple-200/80">
              Understanding ZarielAI's codebase organization
            </p>
          </div>

          <Card className="p-6 bg-black/50 border-purple-500/30">
            <pre className="text-sm text-purple-200 font-mono">
              <code>{`
zariel-ai/
├── src/
│   ├── app/
│   │   ├── api/           # API routes for social media and blockchain
│   │   ├── components/    # Shared UI components
│   │   └── pages/        # Application pages and routes
│   ├── blockchain/
│   │   ├── contracts/    # Smart contract integrations
│   │   ├── wallets/      # Wallet management
│   │   └── analysis/     # Chain analysis tools
│   ├── social/
│   │   ├── twitter/      # X (Twitter) integration
│   │   ├── instagram/    # Instagram automation
│   │   └── tiktok/       # TikTok content management
│   ├── ai/
│   │   ├── voice/        # Voice processing
│   │   ├── nlp/          # Natural language processing
│   │   └── models/       # AI models and training
│   └── utils/
│       ├── security/     # Security utilities
│       ├── analytics/    # Analytics tools
│       └── helpers/      # Helper functions
├── public/
│   └── assets/          # Static assets
├── tests/              # Test suites
└── docs/              # Documentation
              `}</code>
            </pre>
          </Card>

          <div className="grid gap-6">
            <Card className="p-6 bg-black/50 border-purple-500/30">
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-lg bg-purple-500/10">
                  <FolderTree className="w-6 h-6 text-purple-400" />
                </div>
                <div className="space-y-2">
                  <h2 className="text-xl font-semibold text-purple-200">Core Components</h2>
                  <p className="text-gray-400">
                    The src/ directory contains the main application logic, divided into distinct modules for blockchain, social media, and AI functionality.
                  </p>
                </div>
              </div>
            </Card>

            <Card className="p-6 bg-black/50 border-purple-500/30">
              <h3 className="text-lg font-semibold text-purple-200 mb-4">Key Directories</h3>
              <div className="space-y-4 text-gray-400">
                <p><span className="text-purple-400">blockchain/</span> - Contains all blockchain-related functionality including wallet management and chain analysis tools.</p>
                <p><span className="text-purple-400">social/</span> - Houses the social media integration modules for X, Instagram, and TikTok.</p>
                <p><span className="text-purple-400">ai/</span> - Contains voice processing, NLP, and AI model implementations.</p>
                <p><span className="text-purple-400">utils/</span> - Shared utilities for security, analytics, and helper functions.</p>
              </div>
            </Card>
          </div>
        </div>
      </main>
    </div>
  )
}

