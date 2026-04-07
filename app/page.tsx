'use client'

import Navbar from '@/components/Navbar'
import BatchCard from '@/components/BatchCard'
import SplashScreen from '@/components/SplashScreen'
import BatchSelectionPopup from '@/components/BatchSelectionPopup'
import { fetchBatches } from '@/lib/api'
import { motion } from 'motion/react'
import { Sparkles, BookOpen, Users, Trophy, Search, X } from 'lucide-react'
import { useEffect, useState } from 'react'
import Link from 'next/link'

export default function Home() {
  const [batches, setBatches] = useState<any[]>([])
  const [filteredBatches, setFilteredBatches] = useState<any[]>([])
  const [searchQuery, setSearchQuery] = useState('')
  const [loading, setLoading] = useState(true)
  
  // Selection Popup State
  const [selectedBatch, setSelectedBatch] = useState<any>(null)
  const [isSelectionPopupOpen, setIsSelectionPopupOpen] = useState(false)

  useEffect(() => {
    async function loadBatches() {
      try {
        const response = await fetchBatches()
        const data = response.data || []
        setBatches(data)
        setFilteredBatches(data)
      } catch (error) {
        console.error('Error fetching batches:', error)
      } finally {
        setLoading(false)
      }
    }
    loadBatches()
  }, [])

  useEffect(() => {
    const filtered = batches.filter(batch => 
      batch.title.toLowerCase().includes(searchQuery.toLowerCase())
    )
    setFilteredBatches(filtered)
  }, [searchQuery, batches])

  const handleBatchClick = (batch: any) => {
    setSelectedBatch(batch)
    setIsSelectionPopupOpen(true)
  }

  return (
    <main className="min-h-screen pb-20 bg-white">
      <SplashScreen />
      
      {selectedBatch && (
        <BatchSelectionPopup 
          isOpen={isSelectionPopupOpen}
          onClose={() => setIsSelectionPopupOpen(false)}
          batchId={selectedBatch.batch_id}
          batchTitle={selectedBatch.title}
        />
      )}

      <Navbar />
      
      {/* Hero Section */}
      <section className="relative py-24 sm:py-32 overflow-hidden bg-white">
        {/* Abstract 3D Background Elements */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-indigo-50 rounded-full blur-[120px] opacity-60" />
          <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-purple-50 rounded-full blur-[120px] opacity-60" />
          
          {/* Subtle Grid Pattern */}
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-[0.03]" />
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-flex items-center px-4 py-2 rounded-2xl bg-slate-50 border border-slate-100 text-slate-900 text-[10px] font-black uppercase tracking-[0.3em] mb-8 shadow-sm"
            >
              <Sparkles className="w-3.5 h-3.5 mr-2.5 text-indigo-500" />
              The Future of Learning
            </motion.div>
            
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-6xl sm:text-8xl font-black text-slate-900 tracking-tighter mb-12 leading-[0.85]"
            >
              Master <br />
              <span className="text-indigo-600">Exams.</span>
            </motion.h1>
            
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
              className="max-w-md mx-auto mb-20"
            >
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-6 flex items-center pointer-events-none">
                  <Search className="h-4 w-4 text-slate-400 group-focus-within:text-indigo-500 transition-colors" />
                </div>
                <input
                  type="text"
                  placeholder="Search batches..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="block w-full pl-14 pr-14 py-5 bg-white border border-slate-100 rounded-3xl text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-8 focus:ring-indigo-500/5 focus:border-indigo-500 transition-all shadow-[0_15px_40px_-15px_rgba(0,0,0,0.08)]"
                />
              </div>
            </motion.div>
            
          </div>
        </div>
      </section>

      {/* Batches Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
          <div>
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-12 h-1 bg-indigo-600 rounded-full" />
              <span className="text-xs font-black text-indigo-600 uppercase tracking-[0.4em]">Curriculum</span>
            </div>
            <h2 className="text-4xl sm:text-5xl font-black text-slate-900 tracking-tight">
              {searchQuery ? 'Search Results' : 'Premium Batches'}
            </h2>
          </div>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="bg-slate-50 rounded-[2rem] h-[450px] animate-pulse" />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
            {filteredBatches.map((batch: any) => (
              <BatchCard 
                key={batch.batch_id} 
                batch={batch} 
                onClick={handleBatchClick}
              />
            ))}
            {filteredBatches.length === 0 && (
              <div className="col-span-full py-32 text-center bg-slate-50 rounded-[3rem] border-2 border-dashed border-slate-200">
                <div className="w-20 h-20 bg-white rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-xl">
                  <BookOpen className="w-10 h-10 text-slate-300" />
                </div>
                <h3 className="text-2xl font-black text-slate-900 mb-2">No batches found</h3>
                <p className="text-slate-500 font-medium">Try searching for something else or check back later.</p>
              </div>
            )}
          </div>
        )}
      </section>

      {/* Footer / Legal */}
      <footer className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-40 pt-20 border-t border-slate-100">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-16 mb-20">
          <div className="lg:col-span-2">
            <div className="flex items-center space-x-3 mb-8">
              <div className="bg-indigo-600 p-2 rounded-xl">
                <Sparkles className="w-6 h-6 text-white" />
              </div>
              <span className="text-2xl font-black tracking-tighter text-slate-900">
                Next<span className="text-indigo-600">Toppers</span>
              </span>
            </div>
            <p className="text-slate-500 font-medium leading-relaxed max-w-md mb-8">
              Empowering students with high-quality educational resources and 
              expert-led batches. Join our community and transform your academic journey.
            </p>
            <div className="flex space-x-4">
              {/* Social icons could go here */}
            </div>
          </div>
          
          <div>
            <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400 mb-8">Legal</h3>
            <ul className="space-y-4">
              <li><Link href="/privacy" className="text-sm font-bold text-slate-600 hover:text-indigo-600 transition-colors">Privacy Policy</Link></li>
              <li><Link href="/disclaimer" className="text-sm font-bold text-slate-600 hover:text-indigo-600 transition-colors">Disclaimer</Link></li>
              <li><Link href="/terms" className="text-sm font-bold text-slate-600 hover:text-indigo-600 transition-colors">Terms of Service</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400 mb-8">Support</h3>
            <ul className="space-y-4">
              <li><Link href="#" className="text-sm font-bold text-slate-600 hover:text-indigo-600 transition-colors">Help Center</Link></li>
              <li><Link href="#" className="text-sm font-bold text-slate-600 hover:text-indigo-600 transition-colors">Contact Us</Link></li>
              <li><Link href="#" className="text-sm font-bold text-slate-600 hover:text-indigo-600 transition-colors">WhatsApp Support</Link></li>
            </ul>
          </div>
        </div>
        
        <div className="flex flex-col md:flex-row justify-between items-center pt-10 border-t border-slate-50 gap-6">
          <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">© 2026 NextToppers. All rights reserved.</p>
          <div className="flex items-center space-x-2">
            <span className="text-[10px] font-black text-slate-300 uppercase tracking-[0.3em]">Powered by Raj</span>
          </div>
        </div>
      </footer>
    </main>
  )
}
