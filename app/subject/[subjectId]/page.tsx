'use client'

import Navbar from '@/components/Navbar'
import FolderCard from '@/components/FolderCard'
import { fetchFolder } from '@/lib/api'
import { ArrowLeft, BookOpen } from 'lucide-react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { use, useEffect, useState } from 'react'

export default function SubjectPage({ params: paramsPromise }: { params: Promise<{ subjectId: string }> }) {
  const params = use(paramsPromise)
  const router = useRouter()
  const [folderData, setFolderData] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function load() {
      try {
        const data = await fetchFolder(params.subjectId)
        setFolderData(data)
      } catch (error) {
        console.error('Error fetching subject folders:', error)
      } finally {
        setLoading(false)
      }
    }
    load()
  }, [params.subjectId])

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50">
        <Navbar />
        <div className="max-w-5xl mx-auto px-4 py-20 text-center">
          <div className="animate-pulse flex flex-col items-center">
            <div className="w-16 h-16 bg-slate-200 rounded-2xl mb-4" />
            <div className="h-8 w-48 bg-slate-200 rounded mb-2" />
            <div className="h-4 w-32 bg-slate-200 rounded" />
          </div>
        </div>
      </div>
    )
  }

  if (!folderData) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold">Subject not found</h1>
          <Link href="/" className="text-indigo-600 hover:underline mt-4 inline-block">Back to Home</Link>
        </div>
      </div>
    )
  }

  return (
    <main className="min-h-screen bg-slate-50 pb-20">
      <Navbar />
      
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex items-center justify-between mb-10">
          <div>
            <button 
              onClick={() => router.back()} 
              className="inline-flex items-center text-sm text-slate-500 hover:text-indigo-600 mb-4 transition-colors cursor-pointer"
            >
              <ArrowLeft className="w-4 h-4 mr-2" /> Back
            </button>
            <h1 className="text-3xl font-black font-display text-slate-900">{folderData.title}</h1>
            <p className="text-slate-500 mt-1">Select a chapter to begin learning</p>
          </div>
          <div className="w-16 h-16 bg-indigo-600 rounded-2xl flex items-center justify-center shadow-lg shadow-indigo-200">
            <BookOpen className="w-8 h-8 text-white" />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {folderData.data?.map((item: any) => (
            <FolderCard key={item.folder_id} item={item} />
          ))}
          {(!folderData.data || folderData.data.length === 0) && (
            <div className="col-span-full py-20 text-center bg-white rounded-2xl border-2 border-dashed border-slate-200">
              <p className="text-slate-500">No chapters found for this subject.</p>
            </div>
          )}
        </div>
      </div>
    </main>
  )
}
