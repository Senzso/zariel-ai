'use client'

import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Send, Mic, Loader2, Wallet } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useToast } from "@/components/ui/use-toast"
import { Keypair } from '@solana/web3.js'
import { getSolPrice, getTokenInfo, getTokenVolume, checkBalance, getNetworkStatus } from '@/utils/solana'

const WELCOME_MESSAGE = `Welcome to Zariel AI Terminal!
Type !help for a list of available commands.`

const HELP_MESSAGE = `Available commands:
!sol_price - Get current SOL price
!check_balance [address] - Check SOL balance
!network_status - Get Solana network status
!gen_wallet - Generate a new SOL wallet
!volume [token_address] - Check token volume and price
!token_info [token_address] - Get token information
!connect - Connect Phantom wallet
!help - Show this help message

For any other queries, just type your question and I'll assist you.`

export function FuturisticTerminal({ isOpen, onClose }) {
  const { toast } = useToast()
  const [input, setInput] = useState('')
  const [output, setOutput] = useState<string[]>([WELCOME_MESSAGE])
  const [isRecording, setIsRecording] = useState(false)
  const [isWalletConnected, setIsWalletConnected] = useState(false)
  const [isProcessing, setIsProcessing] = useState(false)
  const recognitionRef = useRef<any>(null)
  const outputRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (outputRef.current) {
      outputRef.current.scrollTop = outputRef.current.scrollHeight
    }
  }, [output])

  const handleCommand = async (command: string) => {
    const commandInput = command.toLowerCase().trim()
    
    if (commandInput === '!help') {
      setOutput(prev => [...prev, HELP_MESSAGE])
      return
    }

    if (commandInput === '!sol_price') {
      const response = await getSolPrice()
      setOutput(prev => [...prev, response])
      return
    }

    if (commandInput.startsWith('!check_balance')) {
      const address = command.substring('!check_balance'.length).trim()
      if (!address) {
        setOutput(prev => [...prev, 'Please provide a wallet address'])
        return
      }
      const response = await checkBalance(address)
      setOutput(prev => [...prev, response])
      return
    }

    if (commandInput === '!network_status') {
      const response = await getNetworkStatus()
      setOutput(prev => [...prev, response])
      return
    }

    if (commandInput === '!gen_wallet') {
      const newWallet = Keypair.generate()
      const publicKey = newWallet.publicKey.toString()
      const privateKey = Buffer.from(newWallet.secretKey).toString('hex')
      setOutput(prev => [...prev,
        'New wallet generated:',
        `Public Key: ${publicKey}`,
        `Private Key: ${privateKey}`,
        'IMPORTANT: Save your private key securely. It will not be shown again.'])
      return
    }

    if (commandInput.startsWith('!volume')) {
      const address = command.substring('!volume'.length).trim()
      if (!address) {
        setOutput(prev => [...prev, 'Please provide a token address'])
        return
      }
      const volumeData = await getTokenVolume(address)
      if (volumeData) {
        setOutput(prev => [...prev,
          `Token: ${volumeData.symbol}`,
          `24h Volume: $${parseFloat(volumeData.volume24h).toLocaleString()}`,
          `Price: $${parseFloat(volumeData.priceUsdt).toFixed(6)}`
        ])
      } else {
        setOutput(prev => [...prev, 'Error fetching token volume data'])
      }
      return
    }

    if (commandInput.startsWith('!token_info')) {
      const address = command.substring('!token_info'.length).trim()
      if (!address) {
        setOutput(prev => [...prev, 'Please provide a token address'])
        return
      }
      const tokenInfo = await getTokenInfo(address)
      if (tokenInfo) {
        setOutput(prev => [...prev,
          `Token Name: ${tokenInfo.name}`,
          `Symbol: ${tokenInfo.symbol}`,
          `Decimals: ${tokenInfo.decimals}`,
          `Total Supply: ${tokenInfo.supply}`
        ])
      } else {
        setOutput(prev => [...prev, 'Error fetching token information'])
      }
      return
    }

    if (commandInput === '!connect') {
      await connectPhantomWallet()
      return
    }

    // If no command matches, send to OpenAI
    await handleOpenAIQuery(command)
  }

  const handleSend = async (text: string) => {
    if (text.trim()) {
      setInput('')
      setOutput(prev => [...prev, `> ${text}`])
      setIsProcessing(true)

      try {
        await handleCommand(text)
      } catch (error) {
        console.error('Error processing command:', error)
        setOutput(prev => [...prev, 'Error processing your request. Please try again.'])
      } finally {
        setIsProcessing(false)
      }
    }
  }

  const handleOpenAIQuery = async (query: string) => {
    try {
      const response = await fetch('/api/openai', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ prompt: query }),
      })

      const data = await response.json()
      
      if (!response.ok) {
        throw new Error(data.error || 'Failed to get response from OpenAI')
      }

      setOutput(prev => [...prev, data.response])
    } catch (error: any) {
      console.error('Error calling OpenAI API:', error)
      setOutput(prev => [...prev, `Error: ${error.message}`])
    }
  }

  const connectPhantomWallet = async () => {
    if (typeof window.solana !== 'undefined') {
      try {
        await window.solana.connect()
        const publicKey = window.solana.publicKey.toString()
        setIsWalletConnected(true)
        setOutput(prev => [...prev, `Phantom wallet connected: ${publicKey.slice(0, 4)}...${publicKey.slice(-4)}`])
      } catch (err) {
        console.error('Failed to connect wallet:', err)
        setOutput(prev => [...prev, 'Failed to connect Phantom wallet. Please try again.'])
      }
    } else {
      setOutput(prev => [...prev, 'Phantom wallet extension not found. Please install it and try again.'])
    }
  }

  const startRecording = () => {
    if (!('webkitSpeechRecognition' in window)) {
      toast({
        title: "Speech Recognition Not Supported",
        description: "Your browser doesn't support speech recognition.",
        variant: "destructive",
      })
      return
    }

    const SpeechRecognition = window.webkitSpeechRecognition
    recognitionRef.current = new SpeechRecognition()
    recognitionRef.current.continuous = false
    recognitionRef.current.interimResults = false

    recognitionRef.current.onstart = () => {
      setIsRecording(true)
    }

    recognitionRef.current.onresult = (event) => {
      const transcript = event.results[0][0].transcript
      handleSend(transcript)
    }

    recognitionRef.current.onerror = (event) => {
      console.error('Speech recognition error', event.error)
      setIsRecording(false)
      toast({
        title: "Speech Recognition Error",
        description: "An error occurred while trying to recognize speech.",
        variant: "destructive",
      })
    }

    recognitionRef.current.onend = () => {
      setIsRecording(false)
    }

    recognitionRef.current.start()
  }

  const stopRecording = () => {
    if (recognitionRef.current) {
      recognitionRef.current.stop()
    }
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
        >
          <motion.div
            initial={{ y: 20 }}
            animate={{ y: 0 }}
            exit={{ y: 20 }}
            className="w-full max-w-2xl bg-black/90 border border-purple-500/30 rounded-lg shadow-lg overflow-hidden"
          >
            <div className="flex justify-between items-center p-4 border-b border-purple-500/30">
              <h2 className="text-lg font-mono text-purple-300">Zariel AI Terminal</h2>
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={connectPhantomWallet}
                  disabled={isWalletConnected}
                  className="text-purple-300 border-purple-500/50"
                >
                  <Wallet className="w-4 h-4 mr-2" />
                  {isWalletConnected ? 'Connected' : 'Connect Wallet'}
                </Button>
                <Button variant="ghost" size="icon" onClick={onClose}>
                  <X className="w-5 h-5 text-purple-300" />
                </Button>
              </div>
            </div>
            <div ref={outputRef} className="h-80 p-4 overflow-y-auto font-mono text-sm text-purple-300/90 space-y-2">
              {output.map((line, index) => (
                <div key={index} style={{ whiteSpace: 'pre-wrap' }}>{line}</div>
              ))}
              {isProcessing && <div className="text-purple-300/90">Processing...</div>}
            </div>
            <div className="p-4 border-t border-purple-500/30 flex items-center gap-2">
              <Input
                type="text"
                placeholder="Enter your command..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                className="flex-grow bg-purple-500/10 border-purple-500/30 text-purple-200"
                onKeyPress={(e) => e.key === 'Enter' && !isProcessing && handleSend(input)}
                disabled={isProcessing}
              />
              <Button 
                onClick={() => handleSend(input)} 
                className="bg-purple-500/20 text-purple-200 hover:bg-purple-500/30 border border-purple-500/50"
                disabled={isProcessing}
              >
                <Send className="w-4 h-4" />
              </Button>
              <div className="relative group">
                <Button
                  onClick={isRecording ? stopRecording : startRecording}
                  className={`bg-purple-500/20 text-purple-200 hover:bg-purple-500/30 border border-purple-500/50 ${isRecording ? 'animate-pulse' : ''}`}
                  disabled={isProcessing}
                >
                  {isRecording ? (
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  ) : (
                    <Mic className="w-4 h-4 mr-2" />
                  )}
                  {isRecording ? 'Recording...' : 'Voice'}
                </Button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

