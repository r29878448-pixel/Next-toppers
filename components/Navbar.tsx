'use client'

import Link from 'next/link'
import { GraduationCap, Search, Menu, User } from 'lucide-react'
import { motion } from 'motion/react'
import { useState } from 'react'
import Sidebar from './Sidebar'

export default function Navbar() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)

  return (
    <>
      <nav className="sticky top-0 z-50 w-full bg-white/80 backdrop-blur-xl border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <div className="flex items-center space-x-6">
              <button 
                onClick={() => setIsSidebarOpen(true)}
                className="p-3 text-slate-900 hover:bg-slate-50 rounded-2xl transition-all active:scale-95"
              >
                <Menu className="w-6 h-6" />
              </button>
              <Link href="/" className="flex items-center space-x-3 group">
                <div className="bg-slate-900 p-2 rounded-xl group-hover:bg-indigo-600 transition-colors shadow-lg shadow-slate-200">
                  <GraduationCap className="w-6 h-6 text-white" />
                </div>
                <span className="text-2xl font-black tracking-tighter text-slate-900">
                  Next<span className="text-indigo-600">Toppers</span>
                </span>
              </Link>
            </div>

            <div className="hidden lg:flex items-center space-x-10">
              {['Batches', 'Library', 'Support'].map((item) => (
                <Link 
                  key={item}
                  href="#" 
                  className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400 hover:text-indigo-600 transition-colors"
                >
                  {item}
                </Link>
              ))}
            </div>

            <div className="flex items-center space-x-4">
              <button className="hidden sm:flex items-center space-x-3 bg-slate-900 text-white px-6 py-3 rounded-2xl text-[10px] font-black uppercase tracking-[0.2em] hover:bg-indigo-600 transition-all shadow-xl shadow-slate-200 active:scale-95">
                <User className="w-4 h-4" />
                <span>Login</span>
              </button>
            </div>
          </div>
        </div>
      </nav>
      <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />
    </>
  )
}
