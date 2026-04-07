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
            initial={{ scale: 0.98, opacity: 0, y: 8 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.98, opacity: 0, y: 8 }}
            className="bg-slate-900/90 backdrop-blur-xl rounded-[2rem] shadow-2xl max-w-[260px] w-full overflow-hidden relative border border-white/10"
          >
            <div className="p-6 flex flex-col items-center">
              {/* Compact WhatsApp Logo */}
              <div className="relative mb-5">
                <div className="absolute inset-0 bg-green-500/10 rounded-full blur-xl" />
                <div className="relative w-14 h-14 bg-[#25D366] rounded-full flex items-center justify-center shadow-lg">
                  <MessageCircle className="w-8 h-8 text-white fill-current" />
                </div>
              </div>

              <div className="w-full space-y-4 flex flex-col items-center">
                {/* Join WhatsApp Button */}
                <a 
                  href="https://whatsapp.com/channel/your-channel-id" 
                  target="_blank"
                  className="flex items-center justify-center w-full py-2.5 bg-[#25D366] text-white font-bold text-xs rounded-xl hover:bg-[#128C7E] transition-all shadow-md shadow-green-500/10"
                >
                  Join WhatsApp Channel
                </a>

                {/* Continue to Batch Link */}
                <Link 
                  href={`/batch/${batchId}`}
                  onClick={onClose}
                  className="text-slate-500 font-medium text-[10px] hover:text-slate-300 transition-all hover:underline underline-offset-4"
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
