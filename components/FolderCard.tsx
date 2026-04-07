'use client'

import { motion } from 'motion/react'
import Link from 'next/link'
import { Folder, Video, FileText, ChevronRight } from 'lucide-react'

interface FolderItem {
  type: 'folder' | 'file'
  folder_id?: number
  file_id?: number
  title: string
  content_counts?: {
    pdf?: { total: number }
    video?: { total: number }
  }
}

export default function FolderCard({ item }: { item: FolderItem }) {
  const isFolder = item.type === 'folder'
  
  return (
    <motion.div
      whileHover={{ 
        y: -6,
        rotateX: 1,
        rotateY: -1,
        transition: { duration: 0.3, ease: "easeOut" }
      }}
      className="perspective-1000"
    >
      <Link 
        href={`/folder/${item.folder_id}`} 
        className="group flex items-center justify-between p-5 bg-white rounded-2xl border border-slate-100 shadow-[0_8px_25px_-12px_rgba(0,0,0,0.05)] hover:shadow-[0_15px_35px_-15px_rgba(99,102,241,0.15)] hover:border-indigo-100 transition-all duration-500"
      >
        <div className="flex items-center space-x-4">
          <div className={`w-12 h-12 rounded-xl flex items-center justify-center transition-all duration-500 group-hover:scale-110 shadow-sm ${isFolder ? 'bg-amber-50 text-amber-600 group-hover:bg-amber-100' : 'bg-blue-50 text-blue-600 group-hover:bg-blue-100'}`}>
            {isFolder ? (
              <Folder className="w-6 h-6 fill-current" />
            ) : (
              <FileText className="w-6 h-6" />
            )}
          </div>
          <div>
            <div className="flex items-center space-x-2 mb-0.5">
              <div className={`w-1 h-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity ${isFolder ? 'bg-amber-500' : 'bg-blue-500'}`} />
              <span className={`text-[8px] font-black uppercase tracking-[0.2em] opacity-0 group-hover:opacity-100 transition-opacity ${isFolder ? 'text-amber-500' : 'text-blue-500'}`}>
                {isFolder ? 'Chapter' : 'Material'}
              </span>
            </div>
            <h3 className="font-black text-slate-900 line-clamp-1 group-hover:text-indigo-600 transition-colors">
              {item.title}
            </h3>
            {item.content_counts && (
              <div className="flex items-center space-x-3 mt-1.5">
                {item.content_counts.video && (
                  <span className="flex items-center text-[9px] text-slate-400 font-black uppercase tracking-widest">
                    <Video className="w-3 h-3 mr-1 text-indigo-500" /> {item.content_counts.video.total} Videos
                  </span>
                )}
                {item.content_counts.pdf && (
                  <span className="flex items-center text-[9px] text-slate-400 font-black uppercase tracking-widest">
                    <FileText className="w-3 h-3 mr-1 text-red-500" /> {item.content_counts.pdf.total} PDFs
                  </span>
                )}
              </div>
            )}
          </div>
        </div>
        <div className="w-8 h-8 rounded-full bg-slate-50 flex items-center justify-center group-hover:bg-indigo-600 group-hover:text-white transition-all duration-500">
          <ChevronRight className="w-4 h-4 text-slate-300 group-hover:text-white group-hover:translate-x-0.5 transition-all" />
        </div>
      </Link>
    </motion.div>
  )
}
