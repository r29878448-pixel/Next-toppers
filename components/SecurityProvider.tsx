'use client'

import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { ShieldAlert, Lock } from 'lucide-react'

export default function SecurityProvider({ children }: { children: React.ReactNode }) {
  const [isBreached, setIsBreached] = useState(false)

  useEffect(() => {
    // 1. Disable Right-Click
    const handleContextMenu = (e: MouseEvent) => {
      e.preventDefault()
    }

    // 2. Disable Keyboard Shortcuts
    const handleKeyDown = (e: KeyboardEvent) => {
      // F12
      if (e.key === 'F12') {
        e.preventDefault()
        triggerBreach()
      }
      // Ctrl+Shift+I, Ctrl+Shift+J, Ctrl+Shift+C, Ctrl+U
      if (e.ctrlKey && e.shiftKey && (e.key === 'I' || e.key === 'J' || e.key === 'C')) {
        e.preventDefault()
        triggerBreach()
      }
      if (e.ctrlKey && e.key === 'u') {
        e.preventDefault()
        triggerBreach()
      }
    }

    // 3. DevTools Detection (Debugger Loop)
    const triggerBreach = () => {
      setIsBreached(true)
      // Optional: Clear storage or session
      localStorage.clear()
      sessionStorage.clear()
    }

    const detectDevTools = () => {
      const start = new Date().getTime()
      // This debugger statement will pause execution if DevTools is open
      debugger
      const end = new Date().getTime()
      
      // If the time difference is more than 100ms, DevTools is likely open
      if (end - start > 100) {
        triggerBreach()
      }

      // Clear console to prevent inspection of logs
      console.clear()
      console.log('%cSECURITY ACTIVE', 'color: red; font-size: 40px; font-weight: bold; -webkit-text-stroke: 1px black;')
      console.log('%cUnauthorized inspection is strictly prohibited.', 'color: white; background: red; font-size: 16px; padding: 10px;')
    }

    // Run detection periodically
    const interval = setInterval(detectDevTools, 1000)

    window.addEventListener('contextmenu', handleContextMenu)
    window.addEventListener('keydown', handleKeyDown)

    return () => {
      clearInterval(interval)
      window.removeEventListener('contextmenu', handleContextMenu)
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [])

  if (isBreached) {
    return (
      <div className="fixed inset-0 z-[999] bg-slate-950 flex items-center justify-center p-6 text-center">
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="max-w-md w-full bg-slate-900 border border-red-500/30 p-12 rounded-[2.5rem] shadow-2xl shadow-red-500/10"
        >
          <div className="w-20 h-20 bg-red-500/10 rounded-3xl flex items-center justify-center mx-auto mb-8 border border-red-500/20">
            <ShieldAlert className="w-10 h-10 text-red-500" />
          </div>
          <h1 className="text-3xl font-black text-white mb-4 tracking-tight">Security Breach</h1>
          <p className="text-slate-400 mb-8 leading-relaxed">
            Unauthorized access detected. Developer tools are strictly prohibited on this platform. 
            Your session has been terminated for security reasons.
          </p>
          <div className="flex items-center justify-center space-x-2 text-red-500/60 text-xs font-bold uppercase tracking-widest">
            <Lock className="w-3 h-3" />
            <span>System Lockdown Active</span>
          </div>
          <button 
            onClick={() => window.location.reload()}
            className="mt-10 w-full py-4 bg-white text-slate-950 font-bold rounded-2xl hover:bg-slate-200 transition-all"
          >
            Retry Connection
          </button>
        </motion.div>
      </div>
    )
  }

  return <>{children}</>
}
