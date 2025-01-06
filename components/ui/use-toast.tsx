import { useState, useEffect } from 'react'

interface ToastProps {
  title: string
  description: string
  variant?: 'default' | 'destructive'
}

export function useToast() {
  const [toasts, setToasts] = useState<ToastProps[]>([])

  const toast = (props: ToastProps) => {
    setToasts((prevToasts) => [...prevToasts, props])
  }

  useEffect(() => {
    if (toasts.length > 0) {
      const timer = setTimeout(() => {
        setToasts((prevToasts) => prevToasts.slice(1))
      }, 3000)
      return () => clearTimeout(timer)
    }
  }, [toasts])

  const Toasts = () => (
    <div className="fixed bottom-4 right-4 z-50 flex flex-col gap-2">
      {toasts.map((toast, index) => (
        <div
          key={index}
          className={`p-4 rounded-md shadow-md ${
            toast.variant === 'destructive' ? 'bg-red-500' : 'bg-green-500'
          } text-white`}
        >
          <h3 className="font-bold">{toast.title}</h3>
          <p>{toast.description}</p>
        </div>
      ))}
    </div>
  )

  return { toast, Toasts }
}

