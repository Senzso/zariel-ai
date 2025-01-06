'use client'

import { useEffect, useRef } from 'react'

export function AsciiMap() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const chars = '.・:;"~×+#'
    const fontSize = 12
    ctx.font = `${fontSize}px "Courier New"`
    ctx.fillStyle = 'rgba(147, 51, 234, 0.7)' // Purple tint

    let frame = 0
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      
      for (let y = 0; y < canvas.height; y += fontSize) {
        for (let x = 0; x < canvas.width; x += fontSize) {
          const noise = Math.sin(x * 0.01 + frame * 0.02) * Math.cos(y * 0.01 + frame * 0.02)
          const charIndex = Math.floor((noise + 1) * chars.length / 2)
          ctx.fillText(chars[charIndex], x, y)
        }
      }
      
      frame++
      requestAnimationFrame(animate)
    }

    animate()
  }, [])

  return (
    <canvas 
      ref={canvasRef}
      width={800}
      height={400}
      className="w-full max-w-4xl mx-auto opacity-70"
    />
  )
}

