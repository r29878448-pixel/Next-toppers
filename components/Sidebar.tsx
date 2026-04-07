'use client'

import { motion, AnimatePresence } from 'motion/react'
import { X, GraduationCap, MessageCircle, Send, Bot, Shield, FileText, Info } from 'lucide-react'
import Link from 'next/link'

interface SidebarProps {
  isOpen: boolean
  onClose: () => void
}

export default function Sidebar({ isOpen, onClose }: SidebarProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-[60] bg-slate-900/40 backdrop-blur-sm"
          />
          <motion.div
            initial={{ x: '-100%' }}
            animate={{ x: 0 }}
            exit={{ x: '-100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed top-0 left-0 bottom-0 w-80 z-[70] bg-white shadow-2xl flex flex-col"
          >
            <div className="p-6 border-b border-slate-100 flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <div className="bg-indigo-600 p-1.5 rounded-lg">
                  <GraduationCap className="w-5 h-5 text-white" />
                </div>
                <span className="text-lg font-bold font-display text-slate-900">
                  VIP Study
                </span>
              </div>
              <button onClick={onClose} className="p-2 text-slate-400 hover:text-slate-600">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-6 space-y-8">
              <div>
                <h3 className="text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-4">Community</h3>
                <div className="space-y-2">
                  <a href="#" className="flex items-center space-x-3 p-3 rounded-xl hover:bg-slate-50 text-slate-600 hover:text-indigo-600 transition-all">
                    <MessageCircle className="w-5 h-5 text-green-500" />
                    <span className="font-medium">WhatsApp Channel</span>
                  </a>
                  <a href="#" className="flex items-center space-x-3 p-3 rounded-xl hover:bg-slate-50 text-slate-600 hover:text-indigo-600 transition-all">
                    <Send className="w-5 h-5 text-blue-500" />
                    <span className="font-medium">Telegram Channel</span>
                  </a>
                  <a href="#" className="flex items-center space-x-3 p-3 rounded-xl hover:bg-slate-50 text-slate-600 hover:text-indigo-600 transition-all">
                    <Bot className="w-5 h-5 text-purple-500" />
                    <span className="font-medium">Contact Bot</span>
                  </a>
                </div>
              </div>

              <div>
                <h3 className="text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-4">Support</h3>
                <div className="space-y-2">
                  <button className="w-full flex items-center space-x-3 p-3 rounded-xl hover:bg-slate-50 text-slate-600 hover:text-indigo-600 transition-all text-left">
                    <Info className="w-5 h-5" />
                    <span className="font-medium">Batch Request</span>
                  </button>
                </div>
              </div>

              <div>
                <h3 className="text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-4">Legal</h3>
                <div className="space-y-2">
                  <Link href="/disclaimer" className="flex items-center space-x-3 p-3 rounded-xl hover:bg-slate-50 text-slate-600 hover:text-indigo-600 transition-all">
                    <Shield className="w-5 h-5" />
                    <span className="font-medium">Disclaimer</span>
                  </Link>
                  <Link href="/privacy" className="flex items-center space-x-3 p-3 rounded-xl hover:bg-slate-50 text-slate-600 hover:text-indigo-600 transition-all">
                    <FileText className="w-5 h-5" />
                    <span className="font-medium">Privacy Policy</span>
                  </Link>
                </div>
              </div>
            </div>

            <div className="p-6 border-t border-slate-100">
              <p className="text-[10px] text-slate-400 text-center uppercase tracking-widest font-bold">
                Powered by Raj
              </p>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
