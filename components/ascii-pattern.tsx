'use client'

import { useEffect, useRef } from 'react'

export function AsciiPattern() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const chars = '・:;・×+"~'
    const fontSize = 16
    
    const resizeHandler = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
      ctx.font = `${fontSize}px "JetBrains Mono", monospace`
    }

    window.addEventListener('resize', resizeHandler)
    resizeHandler()

    let frame = 0
    const animate = () => {
      ctx.fillStyle = 'rgba(0, 0, 0, 0.05)'
      ctx.fillRect(0, 0, canvas.width, canvas.height)
      
      const columns = Math.floor(canvas.width / fontSize)
      const rows = Math.floor(canvas.height / fontSize)
      
      const time = frame * 0.02
      for (let i = 0; i < columns; i++) {
        for (let j = 0; j < rows; j++) {
          const x = i * fontSize
          const y = j * fontSize
          
          const distanceFromCenter = Math.sqrt(
            Math.pow((x - canvas.width / 2) / canvas.width, 2) + 
            Math.pow((y - canvas.height / 2) / canvas.height, 2)
          )
          
          const value = Math.sin(distanceFromCenter * 5 + time) * Math.cos(i * 0.1 + time) * Math.sin(j * 0.1 - time)
          const charIndex = Math.floor((value + 1) * chars.length / 2)
          const opacity = Math.abs(value) * 0.6 + 0.2 // Increased base opacity
          
          ctx.fillStyle = `rgba(216, 180, 254, ${opacity})`
          ctx.fillText(chars[charIndex % chars.length], x, y)
        }
      }
      
      frame++
      requestAnimationFrame(animate)
    }

    animate()

    return () => window.removeEventListener('resize', resizeHandler)
  }, [])

  return (
    <canvas 
      ref={canvasRef}
      className="fixed top-0 left-0 w-full h-full"
      style={{ 
        background: 'transparent',
        opacity: 0.85, // Increased overall opacity
        zIndex: -1,
        mixBlendMode: 'screen' // Added blend mode for better visibility
      }}
    />
  )
}

