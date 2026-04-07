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
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
    >
      <Link
        href={`/subject/${subject.subject_id}`}
        className="flex items-center justify-between p-4 bg-white rounded-xl border border-slate-200 shadow-sm hover:border-indigo-300 hover:shadow-md transition-all"
      >
        <div className="flex items-center space-x-4">
          <div className="w-12 h-12 bg-indigo-50 rounded-lg flex items-center justify-center">
            <BookOpen className="w-6 h-6 text-indigo-600" />
          </div>
          <div>
            <h3 className="font-bold text-slate-900">{subject.subject_name}</h3>
            <p className="text-xs text-slate-500">Explore chapters & lectures</p>
          </div>
        </div>
        <ChevronRight className="w-5 h-5 text-slate-400" />
      </Link>
    </motion.div>
  )
}
