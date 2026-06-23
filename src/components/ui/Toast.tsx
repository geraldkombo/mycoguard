import { useCallback, useEffect, useRef, useState } from 'react'
import { registerToastHandler } from './toastUtils'

type ToastType = 'success' | 'info' | 'error'

type ToastItem = {
  id: number
  message: string
  type: ToastType
  exiting?: boolean
}

let toastId = 0

export function ToastContainer() {
  const [toasts, setToasts] = useState<ToastItem[]>([])
  const timers = useRef<Map<number, ReturnType<typeof setTimeout>>>(new Map())

  const removeToast = useCallback((id: number) => {
    setToasts((prev) => prev.map((t) => (t.id === id ? { ...t, exiting: true } : t)))
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id))
      timers.current.delete(id)
    }, 200)
  }, [])

  const addToast = useCallback((message: string, type?: ToastType) => {
    const id = ++toastId
    setToasts((prev) => [...prev, { id, message, type: type ?? 'success' }])
    const timer = setTimeout(() => removeToast(id), 3500)
    timers.current.set(id, timer)
  }, [removeToast])

  useEffect(() => {
    const unregister = registerToastHandler(addToast)
    return unregister
  }, [addToast])

  useEffect(() => {
    const currentTimers = timers.current
    return () => {
      currentTimers.forEach((timer) => clearTimeout(timer))
    }
  }, [])

  if (toasts.length === 0) return null

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-2" aria-live="polite">
      {toasts.map((toast) => {
        const colors = toast.type === 'success'
          ? 'bg-emerald-800 text-white'
          : toast.type === 'error'
            ? 'bg-red-700 text-white'
            : 'bg-stone-800 text-white'
        return (
          <div
            key={toast.id}
            className={`rounded-2xl px-5 py-3 text-sm font-medium shadow-lg ${colors} ${
              toast.exiting ? 'animate-toast-out' : 'animate-toast-in'
            }`}
          >
            <div className="flex items-center gap-3">
              <span>{toast.message}</span>
              <button
                type="button"
                onClick={() => removeToast(toast.id)}
                className="ml-2 rounded-full p-1 opacity-70 hover:opacity-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
                aria-label="Dismiss notification"
              >
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                  <path d="M2 2L12 12M12 2L2 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                </svg>
              </button>
            </div>
          </div>
        )
      })}
    </div>
  )
}
