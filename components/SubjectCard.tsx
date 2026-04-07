'use client'

import { motion } from 'motion/react'
import Link from 'next/link'
import { BookOpen, ChevronRight } from 'lucide-react'

interface Subject {
  subject_id: number
  subject_name: string
}

export default function SubjectCard({ subject }: { subject: Subject }) {
  return (
    <motion.div
      whileHover={{ 
        y: -8,
        rotateX: 1,
        rotateY: -1,
        transition: { duration: 0.3, ease: "easeOut" }
      }}
      whileTap={{ scale: 0.98 }}
      className="perspective-1000"
    >
      <Link
        href={`/subject/${subject.subject_id}`}
        className="group flex items-center justify-between p-6 bg-white rounded-3xl border border-slate-100 shadow-[0_10px_30px_-15px_rgba(0,0,0,0.05)] hover:shadow-[0_20px_40px_-20px_rgba(99,102,241,0.2)] hover:border-indigo-100 transition-all duration-500"
      >
        <div className="flex items-center space-x-5">
          <div className="w-14 h-14 bg-slate-50 rounded-2xl flex items-center justify-center group-hover:bg-indigo-50 group-hover:scale-110 transition-all duration-500 shadow-sm">
            <BookOpen className="w-7 h-7 text-slate-400 group-hover:text-indigo-600 transition-colors" />
          </div>
          <div>
            <div className="flex items-center space-x-2 mb-1">
              <div className="w-1 h-1 bg-indigo-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
              <span className="text-[9px] font-black text-indigo-500 uppercase tracking-[0.2em] opacity-0 group-hover:opacity-100 transition-opacity">Curriculum</span>
            </div>
            <h3 className="text-lg font-black text-slate-900 group-hover:text-indigo-600 transition-colors leading-tight">
              {subject.subject_name}
            </h3>
            <p className="text-xs text-slate-400 font-medium mt-1">Explore chapters & lectures</p>
          </div>
        </div>
        <div className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center group-hover:bg-indigo-600 group-hover:text-white transition-all duration-500">
          <ChevronRight className="w-5 h-5 text-slate-400 group-hover:text-white group-hover:translate-x-0.5 transition-all" />
        </div>
      </Link>
    </motion.div>
  )
}
