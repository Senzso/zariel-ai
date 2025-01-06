'use client'

import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { AlertCircle, Info, Plus } from 'lucide-react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export function VolumeBotPreview() {
  return (
    <Card className="w-full max-w-6xl mx-auto bg-black/90 border border-purple-500/30 p-4">
      <div className="mb-4">
        <h2 className="text-xl font-mono text-purple-200">Anti-MEV Volume Bot</h2>
        <p className="text-xs text-purple-300/70 mt-1">
          Complete buy and sell within the same block, increasing trading volume without additional losses.
        </p>
      </div>

      <div className="grid grid-cols-3 gap-4">
        <div className="col-span-2 space-y-4 opacity-50 pointer-events-none">
          <div className="flex gap-2">
            <div className="flex-grow">
              <label className="text-xs font-medium text-purple-200">Select Token</label>
              <Select>
                <SelectTrigger className="w-full bg-purple-500/10 border-purple-500/30 text-purple-200">
                  <SelectValue placeholder="Select token to brush volume" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="placeholder">Select Token</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <label className="text-xs font-medium text-purple-200">Amount (SOL)</label>
              <Input 
                disabled
                placeholder="0.00"
                className="bg-purple-500/10 border-purple-500/30 text-purple-200"
              />
            </div>
          </div>

          <div className="flex gap-2">
            <div className="flex-grow">
              <label className="text-xs font-medium text-purple-200">Private Key</label>
              <div className="flex gap-2">
                <Input 
                  disabled
                  className="bg-purple-500/10 border-purple-500/30 text-purple-200"
                  placeholder="Enter Private Key"
                />
                <Button variant="outline" size="sm" className="whitespace-nowrap bg-purple-500/10 border-purple-500/30 text-purple-200">
                  <Plus className="w-3 h-3 mr-1" />
                  Add
                </Button>
              </div>
            </div>
            <div>
              <label className="text-xs font-medium text-purple-200">Address</label>
              <Input 
                disabled
                className="bg-purple-500/10 border-purple-500/30 text-purple-200"
              />
            </div>
          </div>

          <div className="flex gap-2">
            <div>
              <label className="text-xs font-medium text-purple-200">SOL Balance</label>
              <Input 
                disabled
                className="bg-purple-500/10 border-purple-500/30 text-purple-200"
              />
            </div>
            <div>
              <label className="text-xs font-medium text-purple-200">TOKEN Balance</label>
              <Input 
                disabled
                className="bg-purple-500/10 border-purple-500/30 text-purple-200"
              />
            </div>
          </div>

          <div>
            <label className="text-xs font-medium text-purple-200">DEX Selection</label>
            <div className="flex gap-2 mt-1">
              {["Raydium", "Pump", "MoonShot", "Orca"].map((dex, index) => (
                <Button 
                  key={dex}
                  variant="outline" 
                  size="sm"
                  disabled 
                  className={index === 1 ? "bg-orange-500/20 border-orange-500/30 text-orange-200" : "bg-purple-500/10 border-purple-500/30 text-purple-200"}
                >
                  {dex}
                </Button>
              ))}
            </div>
          </div>

          <div>
            <label className="text-xs font-medium text-purple-200">Jito MEV Tip</label>
            <div className="flex gap-2 mt-1">
              {[
                { value: "0", label: "0" },
                { value: "default", label: "Default 0.00003" },
                { value: "high", label: "High 0.0001" },
                { value: "ultra", label: "Ultra-High 0.0003", selected: true },
                { value: "max", label: "0.001" }
              ].map((option) => (
                <Button 
                  key={option.value}
                  variant="outline" 
                  size="sm"
                  disabled 
                  className={option.selected ? "bg-orange-500/20 border-orange-500/30 text-orange-200" : "bg-purple-500/10 border-purple-500/30 text-purple-200"}
                >
                  {option.label}
                </Button>
              ))}
            </div>
          </div>
        </div>

        <div className="space-y-4 opacity-50 pointer-events-none">
          <div className="space-y-2">
            <div className="p-2 bg-purple-500/5 rounded-lg border border-purple-500/20">
              <div className="flex items-center justify-between">
                <label className="text-xs font-medium text-purple-200">Estimated Loss Cost</label>
                <p className="text-sm text-purple-300">-</p>
              </div>
            </div>
            <div className="p-2 bg-purple-500/5 rounded-lg border border-purple-500/20">
              <div className="flex items-center justify-between">
                <label className="text-xs font-medium text-purple-200">Estimated Service Fee</label>
                <p className="text-sm text-purple-300">0.005 SOL</p>
              </div>
            </div>
            <div className="p-2 bg-purple-500/5 rounded-lg border border-purple-500/20">
              <div className="flex items-center justify-between">
                <label className="text-xs font-medium text-purple-200">Estimated Volume</label>
                <p className="text-sm text-purple-300">0 SOL ≈ $0</p>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <label className="text-xs font-medium text-purple-200">Random Amount</label>
            <Switch id="random-mode" disabled />
          </div>

          <Button disabled className="w-full bg-orange-500/20 text-orange-200 hover:bg-orange-500/30 border border-orange-500/50">
            Start Volume Brushing
          </Button>

          <div className="text-center text-xs text-purple-300/70">
            Lowest service fee: 0.005 SOL per brush
          </div>

          <Card className="bg-purple-500/5 border-purple-500/20">
            <div className="p-2 flex items-center justify-between border-b border-purple-500/20">
              <h3 className="text-xs font-medium text-purple-200">Volume Brushing Log</h3>
              <div className="flex items-center gap-2">
                <span className="text-xs text-purple-300">Brushed: 0 times</span>
                <Button variant="outline" size="sm" disabled className="text-xs text-green-400 border-green-500/30">
                  Refresh
                </Button>
              </div>
            </div>
            <div className="p-4 text-center text-purple-300/70 text-xs">
              No Records
            </div>
          </Card>
        </div>
      </div>

      <div className="mt-4 rounded-lg border border-yellow-500/30 bg-yellow-500/5 p-2 text-yellow-200/90 flex items-start gap-2">
        <AlertCircle className="w-4 h-4 mt-0.5" />
        <div className="text-xs">
          Cannot access volume bot features. Please hold a minimum of 15M ZAI tokens for at least 24 hours to unlock this functionality.
        </div>
      </div>
    </Card>
  )
}

