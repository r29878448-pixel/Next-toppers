import Navbar from '@/components/Navbar'
import SubjectCard from '@/components/SubjectCard'
import { fetchBatchDetails } from '@/lib/api'
import Image from 'next/image'
import { ArrowLeft, IndianRupee, ShieldCheck, Clock, Layers } from 'lucide-react'
import Link from 'next/link'

export default async function BatchDetailsPage({ params }: { params: Promise<{ batchId: string }> }) {
  const { batchId } = await params
  let batchData = null
  
  try {
    const response = await fetchBatchDetails(batchId)
    batchData = response.data
  } catch (error) {
    console.error('Error fetching batch details:', error)
  }

  if (!batchData) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold">Batch not found</h1>
          <Link href="/" className="text-indigo-600 hover:underline mt-4 inline-block">Back to Home</Link>
        </div>
      </div>
    )
  }

  const { details, subjects } = batchData

  return (
    <main className="min-h-screen bg-slate-50 pb-20">
      <Navbar />
      
      {/* Header */}
      <div className="bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <Link href="/" className="inline-flex items-center text-sm text-slate-500 hover:text-indigo-600 mb-6 transition-colors">
            <ArrowLeft className="w-4 h-4 mr-2" /> Back to Batches
          </Link>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            <div className="lg:col-span-2">
              <h1 className="text-4xl font-black font-display text-slate-900 mb-4">{details.title}</h1>
              <div 
                className="prose prose-slate max-w-none text-slate-600 mb-8"
                dangerouslySetInnerHTML={{ __html: details.description }}
              />
              
              <div className="flex flex-wrap gap-6">
                <div className="flex items-center space-x-2 text-slate-600">
                  <Clock className="w-5 h-5 text-indigo-500" />
                  <span className="text-sm font-medium">12 Months Validity</span>
                </div>
                <div className="flex items-center space-x-2 text-slate-600">
                  <Layers className="w-5 h-5 text-indigo-500" />
                  <span className="text-sm font-medium">{subjects.length} Subjects Covered</span>
                </div>
                <div className="flex items-center space-x-2 text-slate-600">
                  <ShieldCheck className="w-5 h-5 text-indigo-500" />
                  <span className="text-sm font-medium">Verified Content</span>
                </div>
              </div>
            </div>
            
            <div className="lg:col-span-1">
              <div className="bg-white rounded-2xl border border-slate-200 shadow-xl p-6 sticky top-24">
                <div className="relative aspect-video rounded-xl overflow-hidden mb-6">
                  <Image 
                    src={details.thumbnail || 'https://picsum.photos/seed/batch/800/450'} 
                    alt={details.title}
                    fill
                    className="object-cover"
                    referrerPolicy="no-referrer"
                  />
                </div>
                <div className="flex items-center justify-between mb-6">
                  <span className="text-slate-500 font-medium">Course Price</span>
                  <div className="flex items-center text-3xl font-black text-slate-900">
                    <IndianRupee className="w-6 h-6" />
                    {details.price}
                  </div>
                </div>
                <button className="w-full py-4 bg-indigo-600 text-white font-bold rounded-xl hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-200 mb-4">
                  Enrol in Batch
                </button>
                <p className="text-center text-xs text-slate-400">7-day money back guarantee</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Subjects */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-16">
        <h2 className="text-2xl font-bold text-slate-900 font-display mb-8">Course Curriculum</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {subjects.map((subject: any) => (
            <SubjectCard key={subject.subject_id} subject={subject} />
          ))}
        </div>
      </section>
    </main>
  )
}
