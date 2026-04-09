import Navbar from '@/components/Navbar'
import { Shield, ArrowLeft } from 'lucide-react'
import Link from 'next/link'

export default function PrivacyPage() {
  return (
    <main className="min-h-screen bg-slate-50">
      <Navbar />
      <div className="max-w-3xl mx-auto px-4 py-12">
        <Link href="/" className="inline-flex items-center text-sm text-slate-500 hover:text-indigo-600 mb-8 transition-colors">
          <ArrowLeft className="w-4 h-4 mr-2" /> Back to Home
        </Link>
        
        <div className="bg-white rounded-3xl border border-slate-200 p-8 md:p-12 shadow-sm">
          <div className="w-16 h-16 bg-indigo-50 rounded-2xl flex items-center justify-center mb-8">
            <Shield className="w-8 h-8 text-indigo-600" />
          </div>
          
          <h1 className="text-3xl font-black font-display text-slate-900 mb-6">Privacy Policy</h1>
          
          <div className="prose prose-slate max-w-none">
            <p className="text-slate-600 leading-relaxed mb-6">
              At NextToppers (Study Portal), we take your privacy seriously. This policy explains how we collect, use, and protect your personal information.
            </p>
            
            <h2 className="text-xl font-bold text-slate-900 mt-8 mb-4">1. Information Collection</h2>
            <p className="text-slate-600 mb-6">
              We collect information you provide directly to us when you create an account, enroll in a batch, or contact us for support.
            </p>
            
            <h2 className="text-xl font-bold text-slate-900 mt-8 mb-4">2. Data Usage</h2>
            <p className="text-slate-600 mb-6">
              Your data is used to provide educational services, process payments, and send important updates regarding your courses.
            </p>
            
            <h2 className="text-xl font-bold text-slate-900 mt-8 mb-4">3. Data Security</h2>
            <p className="text-slate-600 mb-6">
              We implement industry-standard security measures to protect your data from unauthorized access or disclosure.
            </p>
          </div>
        </div>
      </div>
    </main>
  )
}
