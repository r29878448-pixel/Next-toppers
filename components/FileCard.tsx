'use client'

import { motion } from 'motion/react'
import Link from 'next/link'
import { Play, FileText, Download, Clock } from 'lucide-react'

interface FileItem {
  type: 'file'
  file_id: number
  title: string
  duration?: number
  stream_url: string
  is_downloadable: number
}

export default function FileCard({ file, folderId }: { file: FileItem, folderId?: string }) {
  const isVideo = file.stream_url?.endsWith('.m3u8') || false
  
  const href = isVideo 
    ? `/video?url=${encodeURIComponent(file.stream_url || '')}&title=${encodeURIComponent(file.title)}${folderId ? `&folderId=${folderId}` : ''}`
    : `/pdf?url=${encodeURIComponent(file.stream_url || '')}&title=${encodeURIComponent(file.title)}`

  return (
    <motion.div
      whileHover={{ scale: 1.01 }}
      className="group bg-white rounded-xl border border-slate-200 p-4 flex items-center justify-between hover:border-indigo-300 transition-all"
    >
      <div className="flex items-center space-x-4 flex-1 min-w-0">
        <div className={`w-12 h-12 rounded-full flex items-center justify-center shrink-0 ${isVideo ? 'bg-indigo-600 text-white' : 'bg-red-50 text-red-600'}`}>
          {isVideo ? <Play className="w-5 h-5 fill-current" /> : <FileText className="w-5 h-5" />}
        </div>
        <div className="min-w-0">
          <h4 className="font-bold text-slate-900 truncate group-hover:text-indigo-600 transition-colors">
            {file.title}
          </h4>
          <div className="flex items-center space-x-3 mt-1">
            {isVideo && file.duration !== undefined && (
              <span className="flex items-center text-xs text-slate-500">
                <Clock className="w-3 h-3 mr-1" /> {file.duration > 0 ? `${Math.floor(file.duration / 60)}m` : 'Lecture'}
              </span>
            )}
            <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400">
              {isVideo ? 'Video Lecture' : 'Study Material'}
            </span>
          </div>
        </div>
      </div>
      
      <div className="flex items-center space-x-2">
        <Link 
          href={href}
          className="px-4 py-2 bg-slate-900 text-white text-xs font-bold rounded-lg hover:bg-indigo-600 transition-colors"
        >
          {isVideo ? 'Watch Now' : 'View PDF'}
        </Link>
        {file.is_downloadable === 1 && (
          <button className="p-2 text-slate-400 hover:text-indigo-600 transition-colors">
            <Download className="w-4 h-4" />
          </button>
        )}
      </div>
    </motion.div>
  )
}
