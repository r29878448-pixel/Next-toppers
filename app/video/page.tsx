'use client'

import { useSearchParams } from 'next/navigation'
import Navbar from '@/components/Navbar'
import PremiumVideoPlayer from '@/components/PremiumVideoPlayer'
import { ArrowLeft, MessageSquare, List, Info, Download, Share2, Heart, MessageCircle, Clock, Users, Play, ChevronRight } from 'lucide-react'
import Link from 'next/link'
import { Suspense, useEffect, useState } from 'react'
import { fetchFolder } from '@/lib/api'
import { motion } from 'motion/react'

function VideoContent() {
  const searchParams = useSearchParams()
  const url = searchParams.get('url')
  const title = searchParams.get('title')
  const folderId = searchParams.get('folderId')
  
  const [relatedLectures, setRelatedLectures] = useState<any[]>([])
  const [folderTitle, setFolderTitle] = useState<string>('')
  const [loadingRelated, setLoadingRelated] = useState(false)

  useEffect(() => {
    if (folderId) {
      async function loadRelated() {
        setLoadingRelated(true)
        try {
          const data = await fetchFolder(folderId!)
          setFolderTitle(data.title || '')
          const files = data.data?.filter((item: any) => item.type === 'file' && item.stream_url?.endsWith('.m3u8')) || []
          setRelatedLectures(files)
        } catch (error) {
          console.error('Error fetching related lectures:', error)
        } finally {
          setLoadingRelated(false)
        }
      }
      loadRelated()
    }
  }, [folderId])

  if (!url) return (
    <div className="min-h-[60vh] flex items-center justify-center">
      <div className="text-center space-y-4">
        <div className="w-16 h-16 bg-red-50 text-red-500 rounded-full flex items-center justify-center mx-auto">
          <Info className="w-8 h-8" />
        </div>
        <h2 className="text-xl font-bold text-slate-900">Invalid video URL</h2>
        <Link href="/" className="text-indigo-600 font-bold hover:underline">Back to Home</Link>
      </div>
    </div>
  )

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-10">
      <div className="space-y-8">
        {/* Video Player Section */}
        <div className="bg-black rounded-3xl overflow-hidden shadow-2xl ring-1 ring-white/10 aspect-video w-full max-w-5xl mx-auto">
          <PremiumVideoPlayer src={url} title={title || 'Lecture'} />
        </div>
        
        <div className="max-w-5xl mx-auto space-y-8">
          {/* Video Info Card */}
          <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-10 shadow-sm">
            <div className="flex flex-col md:flex-row md:items-start justify-between gap-6 mb-10">
              <div className="flex-1">
                <div className="flex items-center space-x-2 mb-4">
                  <span className="px-3 py-1 bg-indigo-50 text-indigo-600 text-[10px] font-black uppercase tracking-widest rounded-full border border-indigo-100">
                    Premium Content
                  </span>
                  <span className="px-3 py-1 bg-green-50 text-green-600 text-[10px] font-black uppercase tracking-widest rounded-full border border-green-100">
                    Verified Lecture
                  </span>
                </div>
                <h1 className="text-2xl sm:text-4xl font-black text-slate-900 mb-4 leading-tight tracking-tight">{title}</h1>
                <div className="flex flex-wrap items-center gap-6 text-sm text-slate-500">
                  <span className="flex items-center font-medium"><Clock className="w-4 h-4 mr-2 text-indigo-500" /> 45:00 Duration</span>
                  <span className="flex items-center font-medium"><Users className="w-4 h-4 mr-2 text-indigo-500" /> 1.2k Students</span>
                  <span className="flex items-center font-medium"><Heart className="w-4 h-4 mr-2 text-red-500" /> 98% Rating</span>
                </div>
              </div>
              <div className="flex items-center space-x-3 shrink-0">
                <button className="px-8 py-4 bg-slate-900 text-white font-black text-sm rounded-2xl hover:bg-slate-800 transition-all shadow-xl shadow-slate-200 flex items-center justify-center group">
                  <Download className="w-4 h-4 mr-2 group-hover:translate-y-0.5 transition-transform" /> Download Notes
                </button>
                <button className="p-4 bg-slate-50 text-slate-600 rounded-2xl hover:bg-indigo-50 hover:text-indigo-600 transition-colors border border-slate-100">
                  <Share2 className="w-5 h-5" />
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-12">
              {[
                { icon: MessageSquare, title: 'Discussion', desc: 'Ask doubts live with experts', color: 'text-blue-600', bg: 'bg-blue-50' },
                { icon: List, title: 'Resources', desc: 'Access PDFs & Assignments', color: 'text-amber-600', bg: 'bg-amber-50' },
                { icon: MessageCircle, title: 'WhatsApp', desc: 'Get instant channel updates', color: 'text-green-600', bg: 'bg-green-50' }
              ].map((item, idx) => (
                <div key={idx} className="p-6 bg-slate-50/50 rounded-3xl border border-slate-100 hover:bg-white hover:shadow-xl hover:border-indigo-100 transition-all cursor-pointer group">
                  <div className={`w-12 h-12 ${item.bg} rounded-2xl flex items-center justify-center shadow-sm mb-4 group-hover:scale-110 transition-transform`}>
                    <item.icon className={`w-6 h-6 ${item.color}`} />
                  </div>
                  <h4 className="font-black text-slate-900 text-base mb-1">{item.title}</h4>
                  <p className="text-xs text-slate-500 leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>

            <div className="prose prose-slate max-w-none border-t border-slate-100 pt-10">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-black text-slate-900 flex items-center m-0">
                  <Info className="w-6 h-6 mr-3 text-indigo-500" /> Lecture Overview
                </h3>
              </div>
              <p className="text-slate-600 leading-relaxed text-base sm:text-lg">
                Welcome to this premium lecture on <strong>{title}</strong>. In this session, we dive deep into the core concepts, 
                practical applications, and exam-oriented strategies. This content is exclusively curated for NextToppers 
                students to ensure maximum conceptual clarity and academic excellence.
              </p>
              <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-4">
                {[
                  'Comprehensive coverage of all sub-topics', 
                  'Real-world examples and case studies', 
                  'Previous year question analysis', 
                  'Advanced tips and tricks for exams'
                ].map((text, i) => (
                  <div key={i} className="flex items-center text-sm font-medium text-slate-700 bg-slate-50 p-4 rounded-2xl border border-slate-100 hover:border-indigo-200 transition-colors">
                    <div className="w-2 h-2 bg-indigo-500 rounded-full mr-4 shadow-[0_0_10px_rgba(99,102,241,0.5)]" />
                    {text}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* More Lectures Section - Now Below the Video Info */}
          <div className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-sm">
            <div className="p-6 sm:p-8 border-b border-slate-100 bg-slate-50/50 flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center shadow-xl shadow-indigo-200">
                  <List className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h2 className="font-black text-lg text-slate-900 uppercase tracking-tight">More Lectures</h2>
                  <p className="text-[10px] text-slate-400 font-bold uppercase tracking-[0.2em]">{folderTitle || 'From this folder'}</p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <span className="text-[11px] font-black text-indigo-600 bg-indigo-50 px-3 py-1.5 rounded-full border border-indigo-100">
                  {relatedLectures.length || 0} VIDEOS
                </span>
              </div>
            </div>
            
            <div className="p-6 sm:p-8">
              {loadingRelated ? (
                <div className="py-20 text-center space-y-4">
                  <div className="w-10 h-10 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin mx-auto" />
                  <p className="text-xs text-slate-400 font-black uppercase tracking-[0.3em]">Fetching content...</p>
                </div>
              ) : relatedLectures.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {relatedLectures.map((lecture, i) => {
                    const isCurrent = lecture.stream_url === url;
                    return (
                      <Link 
                        key={lecture.file_id}
                        href={`/video?url=${encodeURIComponent(lecture.stream_url)}&title=${encodeURIComponent(lecture.title)}&folderId=${folderId}`}
                        className={`flex space-x-4 group p-3 rounded-2xl transition-all border-2 ${isCurrent ? 'bg-indigo-50 border-indigo-200' : 'hover:bg-slate-50 border-slate-50 hover:border-indigo-100'}`}
                      >
                        <div className="w-32 aspect-video bg-slate-200 rounded-xl shrink-0 overflow-hidden relative shadow-md">
                          <div className={`absolute inset-0 flex items-center justify-center transition-colors ${isCurrent ? 'bg-indigo-600/30' : 'bg-black/20 group-hover:bg-black/0'}`}>
                            {isCurrent ? (
                              <div className="flex space-x-1">
                                <div className="w-1.5 h-4 bg-white rounded-full animate-bounce" style={{ animationDelay: '0s' }} />
                                <div className="w-1.5 h-4 bg-white rounded-full animate-bounce" style={{ animationDelay: '0.1s' }} />
                                <div className="w-1.5 h-4 bg-white rounded-full animate-bounce" style={{ animationDelay: '0.2s' }} />
                              </div>
                            ) : (
                              <div className="w-10 h-10 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all scale-75 group-hover:scale-100">
                                <Play className="w-5 h-5 text-white fill-current ml-0.5" />
                              </div>
                            )}
                          </div>
                          <div className="absolute bottom-2 right-2 px-2 py-0.5 bg-black/70 backdrop-blur-md rounded-lg text-[10px] text-white font-black">
                            {lecture.duration > 0 ? `${Math.floor(lecture.duration / 60)}m` : '45m'}
                          </div>
                        </div>
                        <div className="min-w-0 flex flex-col justify-center">
                          <h4 className={`text-sm font-black line-clamp-2 leading-tight transition-colors ${isCurrent ? 'text-indigo-700' : 'text-slate-900 group-hover:text-indigo-600'}`}>
                            {lecture.title}
                          </h4>
                          <div className="flex items-center mt-2">
                            <span className="text-[10px] text-slate-400 font-black uppercase tracking-widest">Part {i + 1}</span>
                            {isCurrent && (
                              <span className="ml-3 flex items-center text-[10px] font-black text-indigo-500 uppercase tracking-widest">
                                <div className="w-1 h-1 bg-indigo-500 rounded-full mr-1.5 animate-ping" />
                                Now Playing
                              </span>
                            )}
                          </div>
                        </div>
                      </Link>
                    )
                  })}
                </div>
              ) : (
                <div className="py-20 text-center bg-slate-50 rounded-3xl border-2 border-dashed border-slate-200">
                  <p className="text-sm text-slate-400 font-bold uppercase tracking-widest">No other lectures found in this folder.</p>
                </div>
              )}
            </div>
            
            <div className="p-6 bg-slate-50 border-t border-slate-100 flex justify-center">
              <button 
                onClick={() => window.history.back()}
                className="px-10 py-4 bg-white text-slate-900 font-black text-xs uppercase tracking-[0.3em] rounded-2xl border-2 border-slate-200 hover:bg-slate-900 hover:text-white hover:border-slate-900 transition-all shadow-lg flex items-center group"
              >
                <ArrowLeft className="w-4 h-4 mr-3 group-hover:-translate-x-1 transition-transform" /> Back to Folder
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function VideoPage() {
  return (
    <main className="min-h-screen bg-slate-50">
      <Navbar />
      <Suspense fallback={
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center space-y-4">
            <div className="w-12 h-12 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin mx-auto" />
            <p className="text-sm font-black text-slate-400 uppercase tracking-widest">Initializing Player...</p>
          </div>
        </div>
      }>
        <VideoContent />
      </Suspense>
    </main>
  )
}
