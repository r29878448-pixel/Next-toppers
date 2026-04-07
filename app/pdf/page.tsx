'use client'

import { useSearchParams } from 'next/navigation'
import Navbar from '@/components/Navbar'
import { ArrowLeft, Download, Maximize2, Share2 } from 'lucide-react'
import Link from 'next/link'
import { Suspense } from 'react'

function PDFContent() {
  const searchParams = useSearchParams()
  const url = searchParams.get('url')
  const title = searchParams.get('title')

  if (!url) return <div>Invalid PDF URL</div>

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xl">
        <div className="p-4 bg-slate-900 text-white flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <h1 className="font-bold truncate max-w-md">{title}</h1>
          </div>
          <div className="flex items-center space-x-3">
            <button className="p-2 hover:bg-white/10 rounded-lg transition-colors">
              <Share2 className="w-4 h-4" />
            </button>
            <a 
              href={url} 
              download 
              className="flex items-center space-x-2 bg-indigo-600 hover:bg-indigo-700 px-4 py-2 rounded-lg text-xs font-bold transition-colors"
            >
              <Download className="w-4 h-4" />
              <span>Download</span>
            </a>
          </div>
        </div>
        
        <div className="aspect-[1/1.4] w-full bg-slate-100">
          <iframe 
            src={`https://docs.google.com/viewer?url=${encodeURIComponent(url)}&embedded=true`}
            className="w-full h-full border-none"
            title={title || 'PDF Viewer'}
          />
        </div>
      </div>
      
      <div className="mt-8 text-center">
        <p className="text-slate-500 text-sm">
          Having trouble viewing? <a href={url} target="_blank" className="text-indigo-600 font-bold hover:underline">Open in new tab</a>
        </p>
      </div>
    </div>
  )
}

export default function PDFPage() {
  return (
    <main className="min-h-screen bg-slate-50">
      <Navbar />
      <Suspense fallback={<div className="p-20 text-center">Loading PDF viewer...</div>}>
        <PDFContent />
      </Suspense>
    </main>
  )
}
