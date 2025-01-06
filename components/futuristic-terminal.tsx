'use client'

import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Send, Mic, Loader2, Wallet, Settings } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useToast } from "@/components/ui/use-toast"
import { Keypair } from '@solana/web3.js'
import { CredentialManager } from './credential-manager'

const WELCOME_MESSAGE = `Welcome to Zariel AI Terminal!
Type !help for a list of available commands.`

const HELP_MESSAGE = `Available commands:
!socialmedia - Manage social media accounts
!smartcontract - Analyze smart contracts
!market - Get market analysis and trends
!wallet - Wallet operations (generate, connect, balance)
!volume - Check token volume
!price - Check token prices
!content - Generate AI-powered content
!sentiment - Analyze social sentiment
!trade - Access trading features
!network - Check Solana network status
!bundler - Transaction bundling operations
!security - Security analysis tools
!help - Show this help message
!credentials - Manage your credentials

For any other queries, just type your question and I'll assist you.`

export function FuturisticTerminal({ isOpen, onClose }) {
  const { toast } = useToast()
  const [input, setInput] = useState('')
  const [output, setOutput] = useState<string[]>([WELCOME_MESSAGE])
  const [isRecording, setIsRecording] = useState(false)
  const [isWalletConnected, setIsWalletConnected] = useState(false)
  const [isProcessing, setIsProcessing] = useState(false)
  const [showCredentialManager, setShowCredentialManager] = useState(false)
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

    // Add a new command to show the credential manager
    if (commandInput === '!credentials') {
      setShowCredentialManager(true)
      return
    }

    // Implement basic responses for each command
    switch (commandInput.split(' ')[0]) {
      case '!socialmedia':
        setOutput(prev => [...prev, "Social media management features are coming soon."])
        break
      case '!smartcontract':
        setOutput(prev => [...prev, "Smart contract analysis tools are in development."])
        break
      case '!market':
        setOutput(prev => [...prev, "Market analysis features will be available shortly."])
        break
      case '!wallet':
        handleWalletOperations(commandInput)
        break
      case '!volume':
        setOutput(prev => [...prev, "Volume checking functionality is being implemented."])
        break
      case '!price':
        setOutput(prev => [...prev, "Price checking features are coming soon."])
        break
      case '!content':
        setOutput(prev => [...prev, "AI-powered content generation is under development."])
        break
      case '!sentiment':
        setOutput(prev => [...prev, "Sentiment analysis tools are being fine-tuned."])
        break
      case '!trade':
        setOutput(prev => [...prev, "Trading features will be available in the next update."])
        break
      case '!network':
        setOutput(prev => [...prev, "Solana network status checking is coming soon."])
        break
      case '!bundler':
        setOutput(prev => [...prev, "Transaction bundling operations are in development."])
        break
      case '!security':
        setOutput(prev => [...prev, "Security analysis tools are being implemented."])
        break
      default:
        // If no command matches, send to OpenAI
        await handleOpenAIQuery(command)
    }
  }

  const handleWalletOperations = (command: string) => {
    const parts = command.split(' ')
    if (parts.length === 1) {
      setOutput(prev => [...prev, "Available wallet operations: generate, connect, balance"])
    } else {
      switch (parts[1]) {
        case 'generate':
          const newWallet = Keypair.generate()
          const publicKey = newWallet.publicKey.toString()
          setOutput(prev => [...prev, `New wallet generated. Public Key: ${publicKey}`])
          break
        case 'connect':
          connectPhantomWallet()
          break
        case 'balance':
          setOutput(prev => [...prev, "Balance checking feature is coming soon."])
          break
        default:
          setOutput(prev => [...prev, "Unknown wallet operation. Try 'generate', 'connect', or 'balance'."])
      }
    }
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
                  onClick={() => setShowCredentialManager(true)}
                  className="text-purple-300 border-purple-500/50"
                >
                  <Settings className="w-4 h-4 mr-2" />
                  Credentials
                </Button>
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
            {showCredentialManager ? (
              <CredentialManager />
            ) : (
              <>
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
              </>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

