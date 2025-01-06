'use client'

import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { AlertCircle, Plus } from 'lucide-react'

export function BundlerPreview() {
  return (
    <Card className="w-full max-w-5xl mx-auto bg-black/90 border border-purple-500/30 p-4 space-y-4">
      <div className="space-y-2">
        <h2 className="text-2xl font-mono text-purple-200">Pump New Address Buy (↑Makers)</h2>
        <p className="text-sm text-purple-300/70">
          Automatically create new wallet addresses, complete the buy transaction, transfer to the main wallet, and close the account. 
          Boost the number of independent wallet purchases of designated tokens at a very low cost.
        </p>
      </div>

      <div className="space-y-6 opacity-50 pointer-events-none">
        <div>
          <label className="text-sm font-medium text-purple-200">Select Token</label>
          <Select disabled>
            <SelectTrigger className="w-full bg-purple-500/10 border-purple-500/30 text-purple-200">
              <SelectValue placeholder="Please select a token or enter the token address" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="placeholder">Select Token</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="grid grid-cols-4 gap-3">
          <div className="col-span-4">
            <label className="text-sm font-medium text-purple-200">Private Key</label>
            <div className="flex gap-2">
              <Input 
                disabled
                placeholder="Enter Private Key"
                className="bg-purple-500/10 border-purple-500/30 text-purple-200 text-sm"
              />
              <Button variant="outline" size="sm" className="whitespace-nowrap bg-purple-500/10 border-purple-500/30 text-purple-200 text-xs">
                <Plus className="w-3 h-3 mr-1" />
                Add Wallet(s)
              </Button>
            </div>
          </div>
          <div>
            <label className="text-sm font-medium text-purple-200">Address</label>
            <Input 
              disabled
              className="bg-purple-500/10 border-purple-500/30 text-purple-200 text-sm"
            />
          </div>
          <div>
            <label className="text-sm font-medium text-purple-200">SOL Balance</label>
            <Input 
              disabled
              className="bg-purple-500/10 border-purple-500/30 text-purple-200 text-sm"
            />
          </div>
          <div>
            <label className="text-sm font-medium text-purple-200">TOKEN Balance</label>
            <Input 
              disabled
              className="bg-purple-500/10 border-purple-500/30 text-purple-200 text-sm"
            />
          </div>
        </div>

        <div>
          <label className="text-sm font-medium text-purple-200">DEX Selection</label>
          <div className="flex gap-1 mt-1">
            {[
              { value: "raydium", label: "Raydium" },
              { value: "pump", label: "Pump", selected: true },
              { value: "moonshot", label: "MoonShot" }
            ].map((dex) => (
              <Button 
                key={dex.value}
                variant="outline" 
                size="sm"
                disabled 
                className={dex.selected ? "text-xs bg-orange-500/20 border-orange-500/30 text-orange-200" : "text-xs bg-purple-500/10 border-purple-500/30 text-purple-200"}
              >
                {dex.label}
              </Button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-2 gap-6">
          <div>
            <label className="text-sm font-medium text-purple-200">Buy Address Count</label>
            <div className="flex gap-2 mt-1">
              {[4, 40, 100, 500, 1000].map((count) => (
                <Button
                  key={count}
                  variant="outline"
                  size="sm"
                  disabled
                  className={count === 4 ? 'text-xs bg-orange-500/20 border-orange-500/30 text-orange-200' : 'text-xs bg-purple-500/10 border-purple-500/30 text-purple-200'}
                >
                  {count}
                </Button>
              ))}
            </div>
          </div>
          <div>
            <label className="text-sm font-medium text-purple-200">Buy Amount (SOL)</label>
            <Input 
              disabled
              placeholder="0.00001"
              className="bg-purple-500/10 border-purple-500/30 text-purple-200 text-sm"
            />
          </div>
        </div>

        <div>
          <label className="text-sm font-medium text-purple-200">Jito MEV Tip</label>
          <div className="flex gap-2 mt-1">
            {[
              { value: "default", label: "Default 0.00003" },
              { value: "high", label: "High 0.00008", selected: true },
              { value: "ultra", label: "Ultra-High 0.00015" },
              { value: "max", label: "0.001" }
            ].map((option) => (
              <Button 
                key={option.value}
                variant="outline" 
                size="sm"
                disabled 
                className={option.selected ? "text-xs bg-orange-500/20 border-orange-500/30 text-orange-200" : "text-xs bg-purple-500/10 border-purple-500/30 text-purple-200"}
              >
                {option.label}
              </Button>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-4 rounded-lg border border-yellow-500/30 bg-yellow-500/5 p-2 text-yellow-200/90 flex items-start gap-2">
        <AlertCircle className="w-4 h-4 mt-0.5" />
        <div className="text-xs">
          Cannot access bundler features. Please hold a minimum of 15M ZAI tokens for at least 24 hours to unlock this functionality.
        </div>
      </div>
    </Card>
  )
}

