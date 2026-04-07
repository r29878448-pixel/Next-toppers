'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { MessageCircle, X } from 'lucide-react'

export default function GlobalWhatsAppPopup() {
  const [isOpen, setIsOpen] = useState(false)
  const [hasShown, setHasShown] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => {
      if (!hasShown) {
        setIsOpen(true)
        setHasShown(true)
      }
    }, 5000) // Show after 5 seconds

    return () => clearTimeout(timer)
  }, [hasShown])

  return (
    <>
      {/* Floating Button */}
      <motion.button
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 z-[90] w-14 h-14 bg-[#25D366] rounded-full flex items-center justify-center shadow-[0_10px_30px_-5px_rgba(37,211,102,0.4)] text-white"
      >
        <MessageCircle className="w-7 h-7 fill-current" />
      </motion.button>

      {/* Popup */}
      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="absolute inset-0 bg-black/40 backdrop-blur-[2px]"
            />
            
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              className="bg-white rounded-[2.5rem] shadow-[0_30px_70px_-20px_rgba(0,0,0,0.2)] max-w-[240px] w-full overflow-hidden relative border border-slate-100"
            >
              <button 
                onClick={() => setIsOpen(false)}
                className="absolute top-4 right-4 p-2 text-slate-300 hover:text-slate-900 transition-colors"
              >
                <X className="w-4 h-4" />
              </button>

              <div className="p-8 flex flex-col items-center">
                <div className="relative mb-6">
                  <div className="absolute inset-0 bg-[#25D366]/20 rounded-full blur-2xl animate-pulse" />
                  <div className="relative w-16 h-16 bg-[#25D366] rounded-full flex items-center justify-center shadow-[0_10px_30px_-5px_rgba(37,211,102,0.4)]">
                    <MessageCircle className="w-9 h-9 text-white fill-current" />
                  </div>
                </div>

                <div className="w-full space-y-4 flex flex-col items-center">
                  <div className="text-center">
                    <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-900 mb-1">Stay Updated</h3>
                    <p className="text-[8px] font-bold text-slate-400 uppercase tracking-widest">Join our community</p>
                  </div>

                  <a 
                    href="https://whatsapp.com/channel/your-channel-id" 
                    target="_blank"
                    className="flex items-center justify-center w-full py-3.5 bg-[#25D366] text-white font-black text-[10px] uppercase tracking-[0.15em] rounded-2xl hover:bg-[#128C7E] transition-all shadow-xl shadow-green-500/20 active:scale-95"
                  >
                    Join Channel
                  </a>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  )
}
