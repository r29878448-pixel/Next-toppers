'use client'

import { motion, AnimatePresence } from 'motion/react'
import { GraduationCap } from 'lucide-react'
import { useEffect, useState } from 'react'

export default function SplashScreen() {
  const [isVisible, setIsVisible] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false)
    }, 2500)
    return () => clearTimeout(timer)
  }, [])

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="fixed inset-0 z-[100] bg-slate-900 flex flex-col items-center justify-center text-white"
        >
          <motion.div
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="flex flex-col items-center"
          >
            <div className="bg-indigo-600 p-6 rounded-3xl shadow-2xl shadow-indigo-500/20 mb-8">
              <GraduationCap className="w-20 h-20 text-white" />
            </div>
            <h1 className="text-4xl font-black font-display tracking-tighter mb-2">
              Next<span className="text-indigo-400">Toppers</span>
            </h1>
            <p className="text-indigo-200/60 font-medium tracking-widest uppercase text-xs">
              VIP Study
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2 }}
            className="absolute bottom-12 text-slate-500 text-sm font-medium"
          >
            Powered by <span className="text-slate-300">Raj</span>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
