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
      whileHover={{ y: -2 }}
      className="bg-white rounded-xl border border-slate-200 p-4 hover:border-indigo-300 hover:shadow-md transition-all"
    >
      <Link href={`/folder/${item.folder_id}`} className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${isFolder ? 'bg-amber-50' : 'bg-blue-50'}`}>
            {isFolder ? (
              <Folder className="w-5 h-5 text-amber-600" />
            ) : (
              <FileText className="w-5 h-5 text-blue-600" />
            )}
          </div>
          <div>
            <h3 className="font-semibold text-slate-900 line-clamp-1">{item.title}</h3>
            {item.content_counts && (
              <div className="flex items-center space-x-3 mt-1">
                {item.content_counts.video && (
                  <span className="flex items-center text-[10px] text-slate-500 uppercase font-bold tracking-wider">
                    <Video className="w-3 h-3 mr-1" /> {item.content_counts.video.total} Videos
                  </span>
                )}
                {item.content_counts.pdf && (
                  <span className="flex items-center text-[10px] text-slate-500 uppercase font-bold tracking-wider">
                    <FileText className="w-3 h-3 mr-1" /> {item.content_counts.pdf.total} PDFs
                  </span>
                )}
              </div>
            )}
          </div>
        </div>
        <ChevronRight className="w-4 h-4 text-slate-300" />
      </Link>
    </motion.div>
  )
}
