'use client'

import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'motion/react'
import { ArrowRight, IndianRupee } from 'lucide-react'

interface Batch {
  batch_id: number
  title: string
  thumbnail: string
  price: string
  description?: string
}

interface BatchCardProps {
  batch: Batch
  onClick?: (batch: Batch) => void
}

export default function BatchCard({ batch, onClick }: BatchCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ 
        y: -12,
        rotateX: 2,
        rotateY: -2,
        scale: 1.02,
        transition: { duration: 0.3, ease: "easeOut" }
      }}
      className="group relative bg-white rounded-[2rem] border border-slate-100 overflow-hidden shadow-[0_10px_40px_-15px_rgba(0,0,0,0.1)] hover:shadow-[0_30px_60px_-20px_rgba(99,102,241,0.25)] transition-all duration-500 cursor-pointer perspective-1000"
      onClick={() => onClick?.(batch)}
    >
      <div className="relative aspect-[16/10] overflow-hidden">
        <Image
          src={batch.thumbnail || 'https://picsum.photos/seed/course/800/450'}
          alt={batch.title}
          fill
          className="object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-slate-900/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end p-6">
          <div className="w-full flex items-center justify-between">
            <span className="text-white text-sm font-black uppercase tracking-[0.2em] flex items-center">
              View Details <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-2 transition-transform" />
            </span>
          </div>
        </div>
        <div className="absolute top-4 right-4 z-10">
          <div className="px-4 py-2 bg-white/90 backdrop-blur-md rounded-2xl shadow-lg border border-white/20 flex items-center text-indigo-600 font-black text-sm">
            <IndianRupee className="w-3.5 h-3.5 mr-0.5" />
            {batch.price}
          </div>
        </div>
      </div>
      
      <div className="p-8">
        <div className="flex items-center space-x-2 mb-3">
          <div className="w-1.5 h-1.5 bg-indigo-500 rounded-full animate-pulse" />
          <span className="text-[10px] font-black text-indigo-500 uppercase tracking-[0.2em]">Premium Batch</span>
        </div>
        <h3 className="text-xl font-black text-slate-900 mb-4 line-clamp-2 group-hover:text-indigo-600 transition-colors leading-tight">
          {batch.title}
        </h3>
        <div className="flex items-center justify-between pt-4 border-t border-slate-50">
          <div className="flex -space-x-2">
            {[1, 2, 3].map((i) => (
              <div key={i} className="w-7 h-7 rounded-full border-2 border-white bg-slate-100 overflow-hidden relative">
                <Image src={`https://picsum.photos/seed/user${i}/100/100`} alt="User" fill className="object-cover" />
              </div>
            ))}
            <div className="w-7 h-7 rounded-full border-2 border-white bg-indigo-50 flex items-center justify-center text-[8px] font-black text-indigo-600">
              +1k
            </div>
          </div>
          <button className="px-5 py-2.5 bg-slate-900 text-white text-[10px] font-black rounded-xl uppercase tracking-widest hover:bg-indigo-600 transition-colors shadow-lg shadow-slate-200">
            Enrol Now
          </button>
        </div>
      </div>
    </motion.div>
  )
}
