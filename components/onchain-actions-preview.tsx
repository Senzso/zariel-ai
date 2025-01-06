'use client'

import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { AlertCircle, ArrowRightLeft, Wallet, TrendingUp, BarChart2 } from 'lucide-react'

export function OnChainActionsPreview() {
  return (
    <Card className="w-full bg-black/90 border border-purple-500/30 p-6 space-y-6">
      <div className="space-y-2">
        <h2 className="text-2xl font-mono text-purple-200">OnChain Actions</h2>
        <p className="text-sm text-purple-300/70">
          Execute Solana blockchain operations with advanced features and real-time market data.
        </p>
      </div>

      <div className="opacity-50 pointer-events-none">
        <Tabs defaultValue="swap" className="w-full">
          <TabsList className="grid grid-cols-4 gap-4 bg-transparent">
            <TabsTrigger 
              value="swap"
              className="bg-purple-500/10 text-purple-200 border border-purple-500/30 data-[state=active]:bg-purple-500/20"
            >
              <ArrowRightLeft className="w-4 h-4 mr-2" />
              Swap
            </TabsTrigger>
            <TabsTrigger 
              value="transfer"
              className="bg-purple-500/10 text-purple-200 border border-purple-500/30 data-[state=active]:bg-purple-500/20"
            >
              <Wallet className="w-4 h-4 mr-2" />
              Transfer
            </TabsTrigger>
            <TabsTrigger 
              value="price"
              className="bg-purple-500/10 text-purple-200 border border-purple-500/30 data-[state=active]:bg-purple-500/20"
            >
              <TrendingUp className="w-4 h-4 mr-2" />
              Price
            </TabsTrigger>
            <TabsTrigger 
              value="analytics"
              className="bg-purple-500/10 text-purple-200 border border-purple-500/30 data-[state=active]:bg-purple-500/20"
            >
              <BarChart2 className="w-4 h-4 mr-2" />
              Analytics
            </TabsTrigger>
          </TabsList>

          <div className="mt-4">
            <TabsContent value="swap" className="space-y-4">
              <div className="grid gap-4">
                <div>
                  <label className="text-sm font-medium text-purple-200">From</label>
                  <Input 
                    disabled
                    placeholder="Enter amount"
                    className="bg-purple-500/10 border-purple-500/30 text-purple-200"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium text-purple-200">To</label>
                  <Input 
                    disabled
                    placeholder="Enter amount"
                    className="bg-purple-500/10 border-purple-500/30 text-purple-200"
                  />
                </div>
                <Button disabled className="w-full bg-purple-500/20 text-purple-200 hover:bg-purple-500/30">
                  Swap Tokens
                </Button>
              </div>
            </TabsContent>

            <TabsContent value="transfer" className="space-y-4">
              <div className="grid gap-4">
                <div>
                  <label className="text-sm font-medium text-purple-200">Recipient Address</label>
                  <Input 
                    disabled
                    placeholder="Enter Solana address"
                    className="bg-purple-500/10 border-purple-500/30 text-purple-200"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium text-purple-200">Amount</label>
                  <Input 
                    disabled
                    placeholder="Enter amount"
                    className="bg-purple-500/10 border-purple-500/30 text-purple-200"
                  />
                </div>
                <Button disabled className="w-full bg-purple-500/20 text-purple-200 hover:bg-purple-500/30">
                  Send Transaction
                </Button>
              </div>
            </TabsContent>

            <TabsContent value="price" className="space-y-4">
              <div className="grid gap-4">
                <div>
                  <label className="text-sm font-medium text-purple-200">Token Address</label>
                  <Input 
                    disabled
                    placeholder="Enter token address"
                    className="bg-purple-500/10 border-purple-500/30 text-purple-200"
                  />
                </div>
                <Button disabled className="w-full bg-purple-500/20 text-purple-200 hover:bg-purple-500/30">
                  Get Price Data
                </Button>
              </div>
            </TabsContent>

            <TabsContent value="analytics" className="space-y-4">
              <div className="grid gap-4">
                <div>
                  <label className="text-sm font-medium text-purple-200">Token Address</label>
                  <Input 
                    disabled
                    placeholder="Enter token address"
                    className="bg-purple-500/10 border-purple-500/30 text-purple-200"
                  />
                </div>
                <Button disabled className="w-full bg-purple-500/20 text-purple-200 hover:bg-purple-500/30">
                  View Analytics
                </Button>
              </div>
            </TabsContent>
          </div>
        </Tabs>
      </div>

      <div className="rounded-lg border border-yellow-500/30 bg-yellow-500/5 p-4 text-yellow-200/90 flex items-start gap-2">
        <AlertCircle className="w-5 h-5 mt-0.5" />
        <div className="text-sm">
          Cannot access OnChain features. Please hold a minimum of 15M ZAI tokens for at least 24 hours to unlock this functionality.
        </div>
      </div>
    </Card>
  )
}

