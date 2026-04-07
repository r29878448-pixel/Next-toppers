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
      
      <div className="p-6">
        <h3 className="text-lg font-black text-slate-900 mb-3 line-clamp-2 group-hover:text-indigo-600 transition-colors leading-tight">
          {batch.title}
        </h3>
        <div className="flex items-center justify-between pt-4 border-t border-slate-50">
          <div className="flex items-center text-indigo-600 font-black text-lg">
            <IndianRupee className="w-4 h-4 mr-0.5" />
            {batch.price}
          </div>
          <div className="w-8 h-8 rounded-full bg-slate-50 flex items-center justify-center group-hover:bg-indigo-600 group-hover:text-white transition-all duration-500">
            <ArrowRight className="w-4 h-4" />
          </div>
        </div>
      </div>
    </motion.div>
  )
}
