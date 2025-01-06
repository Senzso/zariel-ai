import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Search, HelpCircle, MessageCircle, Book, Video } from 'lucide-react'

export default function Help() {
  return (
    <div className="min-h-screen bg-black text-white">
      <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-black to-blue-900/20" />
      
      <main className="relative container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto space-y-12">
          <div className="text-center space-y-4">
            <h1 className="text-5xl font-mono font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-blue-400">
              Help Center
            </h1>
            <p className="text-xl text-purple-200/80">
              Get assistance with ZarielAI
            </p>
          </div>

          <div className="relative">
            <Input 
              type="search"
              placeholder="Search help articles..."
              className="w-full bg-black/50 border-purple-500/30 text-purple-200 pl-12"
            />
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-purple-400" />
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <Card className="p-6 bg-black/50 border-purple-500/30">
              <div className="space-y-4">
                <div className="p-3 w-fit rounded-lg bg-purple-500/10">
                  <Book className="w-6 h-6 text-purple-400" />
                </div>
                <h3 className="text-lg font-semibold text-purple-200">Documentation</h3>
                <p className="text-sm text-gray-400">
                  Comprehensive guides and API documentation for all ZarielAI features.
                </p>
                <Button variant="ghost" className="text-purple-400 hover:text-purple-300">
                  Browse Docs
                </Button>
              </div>
            </Card>

            <Card className="p-6 bg-black/50 border-purple-500/30">
              <div className="space-y-4">
                <div className="p-3 w-fit rounded-lg bg-purple-500/10">
                  <Video className="w-6 h-6 text-purple-400" />
                </div>
                <h3 className="text-lg font-semibold text-purple-200">Video Tutorials</h3>
                <p className="text-sm text-gray-400">
                  Step-by-step video guides for getting started with ZarielAI.
                </p>
                <Button variant="ghost" className="text-purple-400 hover:text-purple-300">
                  Watch Tutorials
                </Button>
              </div>
            </Card>

            <Card className="p-6 bg-black/50 border-purple-500/30">
              <div className="space-y-4">
                <div className="p-3 w-fit rounded-lg bg-purple-500/10">
                  <MessageCircle className="w-6 h-6 text-purple-400" />
                </div>
                <h3 className="text-lg font-semibold text-purple-200">Community Support</h3>
                <p className="text-sm text-gray-400">
                  Join our Discord community for real-time support and discussions.
                </p>
                <Button variant="ghost" className="text-purple-400 hover:text-purple-300">
                  Join Community
                </Button>
              </div>
            </Card>

            <Card className="p-6 bg-black/50 border-purple-500/30">
              <div className="space-y-4">
                <div className="p-3 w-fit rounded-lg bg-purple-500/10">
                  <HelpCircle className="w-6 h-6 text-purple-400" />
                </div>
                <h3 className="text-lg font-semibold text-purple-200">FAQs</h3>
                <p className="text-sm text-gray-400">
                  Quick answers to common questions about using ZarielAI.
                </p>
                <Button variant="ghost" className="text-purple-400 hover:text-purple-300">
                  View FAQs
                </Button>
              </div>
            </Card>
          </div>
        </div>
      </main>
    </div>
  )
}

