'use client'

import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Send, Mic, Loader2, Wallet } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useToast } from "@/components/ui/use-toast"
import { Keypair } from '@solana/web3.js'
import { getTokenProfile, getTokenOrders, getPairInfo } from '@/utils/dexscreener'
import { checkTwitterUsername, postTweet, setTwitterToken } from '@/utils/twitter'

const WELCOME_MESSAGE = `Welcome to Zariel AI Terminal!
Type !help for a list of available commands.`

const HELP_MESSAGE = `Available commands:
!token_profile [address] - Get token profile
!token_orders [chainId] [address] - Get token orders
!pair_info [chainId] [pairId] - Get pair information
!twitter_check [username] - Check Twitter username history
!gen_wallet - Generate a new SOL wallet
!connect - Connect Phantom wallet
!set_twitter_token [token] - Set your Twitter API bearer token
!post [message] - Post a tweet on X (Twitter)
!help - Show this help message

For any other queries, just type your question and I'll assist you.`

export function FuturisticTerminal({ isOpen, onClose, onOpen, shouldSpeak, setShouldSpeak }) {
  const { toast } = useToast()
  const [input, setInput] = useState('')
  const [output, setOutput] = useState<string[]>([WELCOME_MESSAGE])
  const [isRecording, setIsRecording] = useState(false)
  const [isWalletConnected, setIsWalletConnected] = useState(false)
  const [isProcessing, setIsProcessing] = useState(false)
  const [hasBeenOpened, setHasBeenOpened] = useState(false);
  const [twitterToken, setTwitterToken] = useState('')
  const recognitionRef = useRef<any>(null)
  const outputRef = useRef<HTMLDivElement>(null)
  const speechSynthesisRef = useRef<SpeechSynthesis | null>(null)

  const selectFemaleVoice = () => {
    if (speechSynthesisRef.current) {
      const voices = speechSynthesisRef.current.getVoices();
      const femaleVoice = voices.find(voice => voice.name === "Google UK English Female");
      return femaleVoice || null;
    }
    return null;
  };

  useEffect(() => {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      speechSynthesisRef.current = window.speechSynthesis;
      
      // Wait for voices to be loaded
      if (speechSynthesis.onvoiceschanged !== undefined) {
        speechSynthesis.onvoiceschanged = selectFemaleVoice;
      }
    }
  }, []);

  useEffect(() => {
    const loadVoices = () => {
      const voices = speechSynthesisRef.current?.getVoices() || [];
      const femaleVoice = voices.find(voice => voice.name === "Google UK English Female");
    };

    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      speechSynthesisRef.current = window.speechSynthesis;
      
      // Load voices immediately
      loadVoices();

      // Also set up the onvoiceschanged event
      speechSynthesis.onvoiceschanged = loadVoices;
    }
  }, []);

  useEffect(() => {
    if (outputRef.current) {
      outputRef.current.scrollTop = outputRef.current.scrollHeight
    }
  }, [output])

  useEffect(() => {
    if (isOpen && shouldSpeak && output.length > 0 && speechSynthesisRef.current) {
      const lastMessage = output[output.length - 1];
      const utterance = new SpeechSynthesisUtterance(lastMessage);
      const femaleVoice = selectFemaleVoice();
      if (femaleVoice) {
        utterance.voice = femaleVoice;
      }
      speechSynthesisRef.current.cancel(); // Cancel any ongoing speech
      speechSynthesisRef.current.speak(utterance);
    }
  }, [isOpen, shouldSpeak, output]);

  useEffect(() => {
    if (isOpen && !hasBeenOpened) {
      setHasBeenOpened(true);
      onOpen();
    }
  }, [isOpen, hasBeenOpened, onOpen]);

  const handleCommand = async (command: string) => {
    const [cmd, ...args] = command.toLowerCase().trim().split(' ')
    
    switch (cmd) {
      case '!help':
        setOutput(prev => [...prev, HELP_MESSAGE])
        break

      case '!token_profile':
        if (args.length === 0) {
          setOutput(prev => [...prev, 'Please provide a token address'])
        } else {
          const profile = await getTokenProfile(args[0])
          setOutput(prev => [...prev, profile])
          const analysis = await handleOpenAIQuery(profile, '!token_profile')
          setOutput(prev => [...prev, "Analysis:", analysis])
        }
        break

      case '!token_orders':
        if (args.length < 2) {
          setOutput(prev => [...prev, 'Please provide chainId and token address'])
        } else {
          const orders = await getTokenOrders(args[0], args[1])
          setOutput(prev => [...prev, orders])
          const analysis = await handleOpenAIQuery(orders, '!token_orders')
          setOutput(prev => [...prev, "Analysis:", analysis])
        }
        break

      case '!pair_info':
        if (args.length < 2) {
          setOutput(prev => [...prev, 'Please provide chainId and pairId'])
        } else {
          const pairInfo = await getPairInfo(args[0], args[1])
          setOutput(prev => [...prev, pairInfo])
          const analysis = await handleOpenAIQuery(pairInfo, '!pair_info')
          setOutput(prev => [...prev, "Analysis:", analysis])
        }
        break

      case '!twitter_check':
        if (args.length === 0) {
          setOutput(prev => [...prev, 'Please provide a Twitter username']);
        } else {
          const twitterInfo = await checkTwitterUsername(args[0]);
          if ('error' in twitterInfo) {
            setOutput(prev => [...prev, `Error: ${twitterInfo.error}`]);
          } else if (!twitterInfo.formattedData) {
            setOutput(prev => [...prev, 'No information found for this username.']);
          } else {
            setOutput(prev => [...prev, twitterInfo.formattedData]);
            
            // Send the formatted data to OpenAI for analysis
            const analysis = await handleOpenAIQuery(twitterInfo.formattedData, '!twitter_check');
            setOutput(prev => [...prev, "\nAnalysis:", analysis]);
          }
        }
        break

      case '!gen_wallet':
        const newWallet = Keypair.generate()
        const publicKey = newWallet.publicKey.toString()
        const privateKey = Buffer.from(newWallet.secretKey).toString('hex')
        setOutput(prev => [...prev,
          'New wallet generated:',
          `Public Key: ${publicKey}`,
          `Private Key: ${privateKey}`,
          'IMPORTANT: Save your private key securely. It will not be shown again.'])
        break

      case '!connect':
        await connectPhantomWallet()
        break

      case '!set_twitter_token':
        if (args.length === 0) {
          setOutput(prev => [...prev, 'Please provide your Twitter API bearer token'])
        } else {
          setTwitterToken(args[0])
          setOutput(prev => [...prev, 'Twitter API bearer token has been set'])
        }
        break

      case '!post':
        if (args.length === 0) {
          setOutput(prev => [...prev, 'Please provide the message you want to tweet'])
        } else if (!twitterToken) {
          setOutput(prev => [...prev, 'Please set your Twitter API bearer token first using !set_twitter_token'])
        } else {
          const tweetContent = args.join(' ')
          try {
            const result = await postTweet(twitterToken, tweetContent)
            setOutput(prev => [...prev, `Tweet posted successfully! Tweet ID: ${result.data.id}`])
          } catch (error) {
            console.error('Error posting tweet:', error)
            setOutput(prev => [
              ...prev,
              `Error posting tweet: ${error.message}`,
              'Please check your Twitter API token and ensure it has the necessary permissions.'
            ])
          }
        }
        break

      default:
        const analysis = await handleOpenAIQuery(command, 'default');
        setOutput(prev => [...prev, analysis]);
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

  const handleOpenAIQuery = async (query: string, command: string) => {
    try {
      let prompt = '';
      switch (command) {
        case '!token_profile':
          prompt = `Analyze the following token information, focusing on providing a short summary of what the coin is about. Based on the market cap and liquidity, determine the odds of the token being a rug pull or scam. Consider low liquidity and small market cap as potential red flags. ${query}`;
          break;
        case '!token_orders':
          prompt = `Analyze the following token order information. Provide insights on the trading activity, liquidity, and any notable patterns. ${query}`;
          break;
        case '!pair_info':
          prompt = `Analyze the following trading pair information. Discuss the relationship between the two tokens, liquidity, and any potential risks or opportunities. ${query}`;
          break;
        case '!twitter_check':
          prompt = `Analyze the following Twitter username history. Identify any patterns in username changes, potential reasons for changes, and what this might indicate about the account. ${query}`;
          break;
        default:
          prompt = `You are an AI assistant specializing in blockchain and cryptocurrency analysis. Please provide a helpful response to the following query: ${query}`;
      }

      const response = await fetch('/api/openai', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ prompt }),
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`HTTP error! status: ${response.status}, message: ${errorText}`);
      }

      const data = await response.json();
      return data.response;
    } catch (error: any) {
      console.error('Error calling OpenAI API:', error);
      return `Error: ${error.message}`;
    }
  };

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

