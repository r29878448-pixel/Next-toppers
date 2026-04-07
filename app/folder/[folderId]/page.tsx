'use client'

import Navbar from '@/components/Navbar'
import FolderCard from '@/components/FolderCard'
import FileCard from '@/components/FileCard'
import { fetchFolder } from '@/lib/api'
import { ArrowLeft, FolderOpen } from 'lucide-react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { use, useEffect, useState } from 'react'

export default function FolderPage({ params: paramsPromise }: { params: Promise<{ folderId: string }> }) {
  const params = use(paramsPromise)
  const router = useRouter()
  const [folderData, setFolderData] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function load() {
      try {
        const data = await fetchFolder(params.folderId)
        setFolderData(data)
      } catch (error) {
        console.error('Error fetching folder content:', error)
      } finally {
        setLoading(false)
      }
    }
    load()
  }, [params.folderId])

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50">
        <Navbar />
        <div className="max-w-5xl mx-auto px-4 py-20 text-center">
          <div className="animate-pulse flex flex-col items-center">
            <div className="w-14 h-14 bg-slate-200 rounded-xl mb-4" />
            <div className="h-8 w-48 bg-slate-200 rounded mb-2" />
          </div>
        </div>
      </div>
    )
  }

  if (!folderData) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold">Folder not found</h1>
          <Link href="/" className="text-indigo-600 hover:underline mt-4 inline-block">Back to Home</Link>
        </div>
      </div>
    )
  }

  const folders = folderData.data?.filter((item: any) => item.type === 'folder') || []
  const files = folderData.data?.filter((item: any) => item.type === 'file') || []

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
            <p className="text-slate-500 mt-1">
              {folders.length > 0 && `${folders.length} Subfolders`}
              {folders.length > 0 && files.length > 0 && ' • '}
              {files.length > 0 && `${files.length} Files`}
            </p>
          </div>
          <div className="w-14 h-14 bg-amber-50 rounded-xl flex items-center justify-center border border-amber-100">
            <FolderOpen className="w-7 h-7 text-amber-600" />
          </div>
        </div>

        {folders.length > 0 && (
          <div className="mb-12">
            <h2 className="text-sm font-bold uppercase tracking-widest text-slate-400 mb-4">Subfolders</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {folders.map((item: any) => (
                <FolderCard key={item.folder_id} item={item} />
              ))}
            </div>
          </div>
        )}

        {files.length > 0 && (
          <div>
            <h2 className="text-sm font-bold uppercase tracking-widest text-slate-400 mb-4">Files & Lectures</h2>
            <div className="space-y-3">
              {files.map((file: any) => (
                <FileCard key={file.file_id} file={file} folderId={params.folderId} />
              ))}
            </div>
          </div>
        )}

        {folders.length === 0 && files.length === 0 && (
          <div className="py-20 text-center bg-white rounded-2xl border-2 border-dashed border-slate-200">
            <p className="text-slate-500">This folder is empty.</p>
          </div>
        )}
      </div>
    </main>
  )
}
