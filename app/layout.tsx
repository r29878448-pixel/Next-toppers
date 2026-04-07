import type { Metadata } from 'next';
import { inter, outfit } from '@/lib/fonts';
import SecurityProvider from '@/components/SecurityProvider';
import GlobalWhatsAppPopup from '@/components/GlobalWhatsAppPopup';
import './globals.css';

export const metadata: Metadata = {
  title: 'NextToppers | Elevate Your Learning',
  description: 'Professional learning platform for Science and Competitive Exams',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${outfit.variable}`}>
      <body suppressHydrationWarning className="bg-slate-50 text-slate-900 min-h-screen font-sans">
        <SecurityProvider>
          {children}
          <GlobalWhatsAppPopup />
        </SecurityProvider>
      </body>
    </html>
  );
}
