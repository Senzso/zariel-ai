import { Keypair } from '@solana/web3.js'

declare global {
  interface Window {
    solana?: {
      connect(): Promise<void>
      disconnect(): Promise<void>
      publicKey: { toString(): string }
    }
    webkitSpeechRecognition: any
  }
}

export {}

