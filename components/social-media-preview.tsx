'use client'

import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { AlertCircle, Twitter, Instagram, Music2, Sparkles } from 'lucide-react'

export function SocialMediaPreview() {
  return (
    <Card className="w-full max-w-5xl mx-auto bg-black/90 border border-purple-500/30 p-4 space-y-6">
      <div className="space-y-2 mb-4">
        <h2 className="text-2xl font-mono text-purple-200">Social Media Management</h2>
        <p className="text-sm text-purple-300/70">
          Manage and automate your social media presence across multiple platforms with AI-powered content generation.
        </p>
      </div>

      <div className="opacity-50 pointer-events-none">
        <Tabs defaultValue="twitter" className="w-full">
          <TabsList className="grid w-full grid-cols-3 bg-transparent">
            <TabsTrigger 
              value="twitter"
              className="px-2 py-1 text-xs bg-purple-500/10 text-purple-200 border border-purple-500/30 data-[state=active]:bg-purple-500/20"
            >
              <Twitter className="w-3 h-3 mr-1" />
              X (Twitter)
            </TabsTrigger>
            <TabsTrigger 
              value="instagram"
              className="px-2 py-1 text-xs bg-purple-500/10 text-purple-200 border border-purple-500/30 data-[state=active]:bg-purple-500/20"
            >
              <Instagram className="w-3 h-3 mr-1" />
              Instagram
            </TabsTrigger>
            <TabsTrigger 
              value="tiktok"
              className="px-2 py-1 text-xs bg-purple-500/10 text-purple-200 border border-purple-500/30 data-[state=active]:bg-purple-500/20"
            >
              <Music2 className="w-3 h-3 mr-1" />
              TikTok
            </TabsTrigger>
          </TabsList>

          <div className="mt-6">
            <div className="flex justify-between items-center mb-6">
              <div className="space-y-1">
                <h3 className="text-sm font-medium text-purple-200">Account Status</h3>
                <p className="text-xs text-purple-300/70">Not connected</p>
              </div>
              <Button disabled className="bg-purple-500/20 text-purple-200 hover:bg-purple-500/30">
                Connect Account
              </Button>
            </div>

            <div className="grid grid-cols-2 gap-6">
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium text-purple-200">Content Description</label>
                  <Textarea 
                    disabled
                    placeholder="Describe the content you want to create..."
                    className="mt-1.5 bg-purple-500/10 border-purple-500/30 text-purple-200 h-[100px]"
                  />
                </div>

                <Button disabled className="w-full bg-purple-500/20 text-purple-200 hover:bg-purple-500/30">
                  <Sparkles className="w-4 h-4 mr-2" />
                  Generate with ZarielAI
                </Button>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium text-purple-200">Schedule Date</label>
                    <Input 
                      type="datetime-local"
                      disabled
                      className="mt-1.5 bg-purple-500/10 border-purple-500/30 text-purple-200"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-purple-200">Tags</label>
                    <Input 
                      disabled
                      placeholder="#crypto #web3"
                      className="mt-1.5 bg-purple-500/10 border-purple-500/30 text-purple-200"
                    />
                  </div>
                </div>
              </div>

              <div>
                <label className="text-sm font-medium text-purple-200">Generated Content</label>
                <Textarea 
                  disabled
                  placeholder="AI-generated content will appear here..."
                  className="mt-1.5 bg-purple-500/10 border-purple-500/30 text-purple-200 h-[280px]"
                />
              </div>
            </div>

            <Button disabled className="w-full mt-6 bg-purple-500/20 text-purple-200 hover:bg-purple-500/30">
              Schedule Post
            </Button>
          </div>
        </Tabs>
      </div>

      <div className="mt-4 rounded-lg border border-yellow-500/30 bg-yellow-500/5 p-2 text-yellow-200/90 flex items-start gap-2">
        <AlertCircle className="w-4 h-4 mt-0.5" />
        <div className="text-xs">
          Cannot access social media features. Please hold a minimum of 15M ZAI tokens for at least 24 hours to unlock this functionality.
        </div>
      </div>
    </Card>
  )
}

