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
    <main className="min-h-screen pb-20 bg-slate-50">
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
      <section className="relative py-20 overflow-hidden bg-white border-b border-slate-100">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full max-w-7xl">
          <div className="absolute top-0 left-0 w-72 h-72 bg-indigo-400/10 rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-purple-400/10 rounded-full blur-3xl" />
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="text-center">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-flex items-center px-3 py-1 rounded-full bg-indigo-50 border border-indigo-100 text-indigo-600 text-xs font-bold uppercase tracking-widest mb-6"
            >
              <Sparkles className="w-3 h-3 mr-2" />
              Study Portal Premium Learning
            </motion.div>
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-5xl md:text-7xl font-black font-display text-slate-900 tracking-tight mb-6"
            >
              Master Your Exams with <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600">
                NextToppers
              </span>
            </motion.h1>
            
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
              className="max-w-2xl mx-auto mb-10"
            >
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Search className="h-5 w-5 text-slate-400 group-focus-within:text-indigo-500 transition-colors" />
                </div>
                <input
                  type="text"
                  placeholder="Search for batches (e.g. Science, 12th)..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="block w-full pl-12 pr-12 py-5 bg-white border border-slate-200 rounded-2xl text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 transition-all shadow-sm"
                />
                {searchQuery && (
                  <button 
                    onClick={() => setSearchQuery('')}
                    className="absolute inset-y-0 right-0 pr-4 flex items-center text-slate-400 hover:text-slate-600"
                  >
                    <X className="h-5 w-5" />
                  </button>
                )}
              </div>
            </motion.div>
            
            <div className="flex flex-wrap justify-center gap-8 text-slate-500">
              <div className="flex items-center space-x-2">
                <Users className="w-5 h-5 text-indigo-500" />
                <span className="font-medium">10k+ Students</span>
              </div>
              <div className="flex items-center space-x-2">
                <BookOpen className="w-5 h-5 text-indigo-500" />
                <span className="font-medium">500+ Courses</span>
              </div>
              <div className="flex items-center space-x-2">
                <Trophy className="w-5 h-5 text-indigo-500" />
                <span className="font-medium">98% Success Rate</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Batches Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-16">
        <div className="flex items-center justify-between mb-10">
          <div>
            <h2 className="text-3xl font-bold text-slate-900 font-display">
              {searchQuery ? 'Search Results' : 'Available Batches'}
            </h2>
            <p className="text-slate-500 mt-1">
              {searchQuery ? `Found ${filteredBatches.length} batches for "${searchQuery}"` : 'Choose the right path for your academic journey'}
            </p>
          </div>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="bg-white rounded-2xl border border-slate-200 h-80 animate-pulse" />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredBatches.map((batch: any) => (
              <BatchCard 
                key={batch.batch_id} 
                batch={batch} 
                onClick={handleBatchClick}
              />
            ))}
            {filteredBatches.length === 0 && (
              <div className="col-span-full py-20 text-center bg-white rounded-3xl border-2 border-dashed border-slate-200">
                <BookOpen className="w-12 h-12 text-slate-300 mx-auto mb-4" />
                <h3 className="text-xl font-bold text-slate-900">No batches found</h3>
                <p className="text-slate-500">Try searching for something else or check back later.</p>
              </div>
            )}
          </div>
        )}
      </section>

      {/* Footer / Legal */}
      <footer className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-32 pt-12 border-t border-slate-200">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-12">
          <div>
            <h3 className="text-sm font-bold uppercase tracking-widest text-slate-400 mb-4">Disclaimer</h3>
            <p className="text-xs text-slate-500 leading-relaxed">
              NextToppers (Study Portal) provides educational content for informational purposes only. 
              While we strive for accuracy, we are not responsible for any errors or omissions. 
              Batch requests are subject to availability and faculty confirmation. 
              All content is protected by copyright laws.
            </p>
          </div>
          <div className="flex flex-col md:items-end">
            <h3 className="text-sm font-bold uppercase tracking-widest text-slate-400 mb-4">Quick Links</h3>
            <div className="flex space-x-6 mb-4">
              <a href="https://whatsapp.com/channel/0029VbAvDSX0QeahEg4kkE3U" target="_blank" className="text-xs text-slate-500 hover:text-[#25D366] font-bold uppercase tracking-widest transition-colors">WhatsApp</a>
              <a href="https://t.me/+v8mL48KkXfUzNmY1" target="_blank" className="text-xs text-slate-500 hover:text-[#0088cc] font-bold uppercase tracking-widest transition-colors">Telegram</a>
            </div>
            <div className="flex space-x-6">
              <Link href="/privacy" className="text-xs text-slate-500 hover:text-indigo-600 font-bold uppercase tracking-widest">Privacy Policy</Link>
              <Link href="/disclaimer" className="text-xs text-slate-500 hover:text-indigo-600 font-bold uppercase tracking-widest">Disclaimer</Link>
              <span className="text-xs text-slate-300 uppercase tracking-widest font-bold">Powered by Raj</span>
            </div>
          </div>
        </div>
      </footer>
    </main>
  )
}
