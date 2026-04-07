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
      whileHover={{ y: -4 }}
      className="group bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 cursor-pointer"
      onClick={() => onClick?.(batch)}
    >
      <div className="relative aspect-video overflow-hidden">
        <Image
          src={batch.thumbnail || 'https://picsum.photos/seed/course/800/450'}
          alt={batch.title}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-500"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
          <span className="text-white text-sm font-medium flex items-center">
            View Details <ArrowRight className="ml-2 w-4 h-4" />
          </span>
        </div>
      </div>
      <div className="p-5">
        <h3 className="text-lg font-bold text-slate-900 mb-2 line-clamp-1 group-hover:text-indigo-600 transition-colors">
          {batch.title}
        </h3>
        <div className="flex items-center justify-between mt-4">
          <div className="flex items-center text-indigo-600 font-bold text-xl">
            <IndianRupee className="w-4 h-4 mr-0.5" />
            {batch.price}
          </div>
          <span className="px-3 py-1 bg-indigo-50 text-indigo-700 text-xs font-bold rounded-full uppercase tracking-wider">
            Enrol Now
          </span>
        </div>
      </div>
    </motion.div>
  )
}
