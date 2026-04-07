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
      <nav className="sticky top-0 z-50 w-full bg-white/80 backdrop-blur-md border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <button 
                onClick={() => setIsSidebarOpen(true)}
                className="p-2 text-slate-600 hover:bg-slate-100 rounded-lg transition-colors"
              >
                <Menu className="w-6 h-6" />
              </button>
              <Link href="/" className="flex items-center space-x-2">
                <div className="bg-indigo-600 p-1.5 rounded-lg">
                  <GraduationCap className="w-6 h-6 text-white" />
                </div>
                <span className="text-xl font-bold font-display tracking-tight text-slate-900">
                  Next<span className="text-indigo-600">Toppers</span>
                </span>
              </Link>
            </div>

            <div className="hidden md:flex items-center space-x-8">
              <Link href="/" className="text-sm font-medium text-slate-600 hover:text-indigo-600 transition-colors">
                Batches
              </Link>
              <Link href="#" className="text-sm font-medium text-slate-600 hover:text-indigo-600 transition-colors">
                My Library
              </Link>
              <Link href="#" className="text-sm font-medium text-slate-600 hover:text-indigo-600 transition-colors">
                Support
              </Link>
            </div>

            <div className="flex items-center space-x-4">
              <button className="hidden sm:flex items-center space-x-2 bg-indigo-600 text-white px-4 py-2 rounded-full text-sm font-medium hover:bg-indigo-700 transition-colors shadow-sm shadow-indigo-200">
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
