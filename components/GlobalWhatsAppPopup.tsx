'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { MessageCircle, Send, X } from 'lucide-react'

export default function GlobalWhatsAppPopup() {
  const [isOpen, setIsOpen] = useState(false)
  const [hasShown, setHasShown] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => {
      if (!hasShown) {
        setIsOpen(true)
        setHasShown(true)
      }
    }, 3000) // Show after 3 seconds

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
        className="fixed bottom-6 right-6 z-[90] w-16 h-16 bg-[#25D366] rounded-full flex items-center justify-center shadow-[0_10px_30px_-5px_rgba(37,211,102,0.4)] text-white"
      >
        <MessageCircle className="w-8 h-8 fill-current" />
      </motion.button>

      {/* Popup */}
      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            />
            
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              className="bg-white rounded-[2.5rem] shadow-[0_30px_70px_-20px_rgba(0,0,0,0.3)] max-w-[320px] w-full overflow-hidden relative border border-slate-100"
            >
              <button 
                onClick={() => setIsOpen(false)}
                className="absolute top-6 right-6 p-2 text-slate-300 hover:text-slate-900 transition-colors z-10"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="p-8 pt-12 flex flex-col items-center">
                {/* Branding Icon */}
                <div className="relative mb-8">
                  <div className="absolute inset-0 bg-[#25D366]/20 rounded-full blur-3xl animate-pulse" />
                  <div className="relative w-20 h-20 bg-[#25D366] rounded-full flex items-center justify-center shadow-[0_15px_40px_-5px_rgba(37,211,102,0.4)]">
                    <MessageCircle className="w-10 h-10 text-white fill-current" />
                  </div>
                </div>

                <div className="w-full space-y-6 text-center">
                  <div>
                    <h3 className="text-xl font-black text-slate-900 mb-2 tracking-tight">Join Our Community</h3>
                    <p className="text-sm font-medium text-slate-500 leading-relaxed">
                      Stay updated with the latest batches, study materials, and exam alerts.
                    </p>
                  </div>

                  <div className="space-y-3">
                    {/* WhatsApp Button */}
                    <a 
                      href="Follow the Study Portal channel on WhatsApp: https://whatsapp.com/channel/0029Vb7ZwWXHbFV0eqodie2x" 
                      target="_blank"
                      className="flex items-center justify-center w-full py-4 bg-[#25D366] text-white font-bold text-sm rounded-2xl hover:bg-[#128C7E] transition-all shadow-lg shadow-green-500/20 active:scale-95"
                    >
                      <MessageCircle className="w-5 h-5 mr-2 fill-current" />
                      WhatsApp Channel
                    </a>

                    {/* Telegram Button */}
                    <a 
                      href="https://t.me/+v8mL48KkXfUzNmY1" 
                      target="_blank"
                      className="flex items-center justify-center w-full py-4 bg-[#0088cc] text-white font-bold text-sm rounded-2xl hover:bg-[#0077b5] transition-all shadow-lg shadow-blue-500/20 active:scale-95"
                    >
                      <Send className="w-5 h-5 mr-2 fill-current" />
                      Telegram Channel
                    </a>
                  </div>

                  <button 
                    onClick={() => setIsOpen(false)}
                    className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] hover:text-indigo-600 transition-colors"
                  >
                    Maybe Later
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  )
}
