import Navbar from '@/components/Navbar'
import { Info, ArrowLeft } from 'lucide-react'
import Link from 'next/link'

export default function DisclaimerPage() {
  return (
    <main className="min-h-screen bg-slate-50">
      <Navbar />
      <div className="max-w-3xl mx-auto px-4 py-12">
        <Link href="/" className="inline-flex items-center text-sm text-slate-500 hover:text-indigo-600 mb-8 transition-colors">
          <ArrowLeft className="w-4 h-4 mr-2" /> Back to Home
        </Link>
        
        <div className="bg-white rounded-3xl border border-slate-200 p-8 md:p-12 shadow-sm">
          <div className="w-16 h-16 bg-amber-50 rounded-2xl flex items-center justify-center mb-8">
            <Info className="w-8 h-8 text-amber-600" />
          </div>
          
          <h1 className="text-3xl font-black font-display text-slate-900 mb-6">Disclaimer</h1>
          
          <div className="prose prose-slate max-w-none">
            <p className="text-slate-600 leading-relaxed mb-6">
              The information provided by NextToppers (VIP Study) is for general educational purposes only.
            </p>
            
            <h2 className="text-xl font-bold text-slate-900 mt-8 mb-4">Educational Content</h2>
            <p className="text-slate-600 mb-6">
              While we strive to provide the most accurate and up-to-date information, we make no representations or warranties of any kind about the completeness or accuracy of the content.
            </p>
            
            <h2 className="text-xl font-bold text-slate-900 mt-8 mb-4">Batch Requests</h2>
            <p className="text-slate-600 mb-6">
              Requesting a batch does not guarantee enrollment. All requests are subject to review and availability of faculty and resources.
            </p>
            
            <h2 className="text-xl font-bold text-slate-900 mt-8 mb-4">External Links</h2>
            <p className="text-slate-600 mb-6">
              Our platform may contain links to external websites (like WhatsApp or Telegram). We have no control over the content and nature of these sites.
            </p>
          </div>
        </div>
      </div>
    </main>
  )
}
