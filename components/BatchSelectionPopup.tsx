'use client'

import { motion, AnimatePresence } from 'motion/react'
import { X, MessageCircle, ArrowRight, BookOpen } from 'lucide-react'
import Link from 'next/link'

interface BatchSelectionPopupProps {
  isOpen: boolean
  onClose: () => void
  batchId: string | number
  batchTitle: string
}

export default function BatchSelectionPopup({ isOpen, onClose, batchId, batchTitle }: BatchSelectionPopupProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/50 backdrop-blur-[1px]"
          />
          
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="bg-white rounded-[2.5rem] shadow-[0_30px_70px_-20px_rgba(0,0,0,0.2)] max-w-[240px] w-full overflow-hidden relative border border-slate-100"
          >
            <div className="p-8 flex flex-col items-center">
              {/* Perfect WhatsApp Logo */}
              <div className="relative mb-6">
                <div className="absolute inset-0 bg-[#25D366]/20 rounded-full blur-2xl animate-pulse" />
                <div className="relative w-16 h-16 bg-[#25D366] rounded-full flex items-center justify-center shadow-[0_10px_30px_-5px_rgba(37,211,102,0.4)]">
                  <MessageCircle className="w-9 h-9 text-white fill-current" />
                </div>
              </div>

              <div className="w-full space-y-5 flex flex-col items-center">
                {/* Join WhatsApp Button */}
                <a 
                  href="https://whatsapp.com/channel/your-channel-id" 
                  target="_blank"
                  className="flex items-center justify-center w-full py-3.5 bg-[#25D366] text-white font-black text-[10px] uppercase tracking-[0.15em] rounded-2xl hover:bg-[#128C7E] transition-all shadow-xl shadow-green-500/20 active:scale-95"
                >
                  Join WhatsApp Channel
                </a>

                {/* Continue to Batch Link */}
                <Link 
                  href={`/batch/${batchId}`}
                  onClick={onClose}
                  className="text-slate-400 font-black text-[9px] uppercase tracking-[0.2em] hover:text-indigo-600 transition-all"
                >
                  Continue to Batch
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  )
}
