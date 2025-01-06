'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card } from "@/components/ui/card"

interface Credentials {
  twitterApiKey: string
  twitterApiSecret: string
  twitterAccessToken: string
  twitterAccessTokenSecret: string
  openaiApiKey: string
  solanaRpcEndpoint: string
}

export function CredentialManager() {
  const [credentials, setCredentials] = useState<Credentials>({
    twitterApiKey: '',
    twitterApiSecret: '',
    twitterAccessToken: '',
    twitterAccessTokenSecret: '',
    openaiApiKey: '',
    solanaRpcEndpoint: '',
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setCredentials(prev => ({ ...prev, [name]: value }))
  }

  const handleSave = () => {
    // In a real application, you would encrypt these credentials before storing
    localStorage.setItem('userCredentials', JSON.stringify(credentials))
    alert('Credentials saved successfully!')
  }

  return (
    <Card className="p-6 bg-black/90 border border-purple-500/30">
      <h2 className="text-2xl font-bold text-purple-300 mb-4">Credential Manager</h2>
      <div className="space-y-4">
        <div>
          <Label htmlFor="twitterApiKey" className="text-purple-300">Twitter API Key</Label>
          <Input
            id="twitterApiKey"
            name="twitterApiKey"
            value={credentials.twitterApiKey}
            onChange={handleInputChange}
            className="bg-purple-500/10 border-purple-500/30 text-purple-200"
          />
        </div>
        <div>
          <Label htmlFor="twitterApiSecret" className="text-purple-300">Twitter API Secret</Label>
          <Input
            id="twitterApiSecret"
            name="twitterApiSecret"
            value={credentials.twitterApiSecret}
            onChange={handleInputChange}
            className="bg-purple-500/10 border-purple-500/30 text-purple-200"
            type="password"
          />
        </div>
        <div>
          <Label htmlFor="twitterAccessToken" className="text-purple-300">Twitter Access Token</Label>
          <Input
            id="twitterAccessToken"
            name="twitterAccessToken"
            value={credentials.twitterAccessToken}
            onChange={handleInputChange}
            className="bg-purple-500/10 border-purple-500/30 text-purple-200"
          />
        </div>
        <div>
          <Label htmlFor="twitterAccessTokenSecret" className="text-purple-300">Twitter Access Token Secret</Label>
          <Input
            id="twitterAccessTokenSecret"
            name="twitterAccessTokenSecret"
            value={credentials.twitterAccessTokenSecret}
            onChange={handleInputChange}
            className="bg-purple-500/10 border-purple-500/30 text-purple-200"
            type="password"
          />
        </div>
        <div>
          <Label htmlFor="openaiApiKey" className="text-purple-300">OpenAI API Key</Label>
          <Input
            id="openaiApiKey"
            name="openaiApiKey"
            value={credentials.openaiApiKey}
            onChange={handleInputChange}
            className="bg-purple-500/10 border-purple-500/30 text-purple-200"
            type="password"
          />
        </div>
        <div>
          <Label htmlFor="solanaRpcEndpoint" className="text-purple-300">Solana RPC Endpoint (optional)</Label>
          <Input
            id="solanaRpcEndpoint"
            name="solanaRpcEndpoint"
            value={credentials.solanaRpcEndpoint}
            onChange={handleInputChange}
            className="bg-purple-500/10 border-purple-500/30 text-purple-200"
            placeholder="https://api.mainnet-beta.solana.com"
          />
        </div>
        <Button onClick={handleSave} className="bg-purple-500/20 text-purple-200 hover:bg-purple-500/30 border border-purple-500/50">
          Save Credentials
        </Button>
      </div>
    </Card>
  )
}

