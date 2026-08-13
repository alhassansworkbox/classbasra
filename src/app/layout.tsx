import type { Metadata } from 'next'
import { Cairo } from 'next/font/google'
import './globals.css'

const cairo = Cairo({
  subsets: ['arabic', 'latin'],
  weight: ['300', '400', '500', '600', '700', '800'],
  variable: '--font-cairo',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'تقييم تجربتك | Class Dental Clinic',
  description: 'شاركنا رأيك في تجربتك مع عيادة كلاس لطب الأسنان',
  robots: 'noindex, nofollow',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ar" dir="rtl" className={cairo.variable}>
      <body className="font-cairo bg-[#F5F7FA] text-[#1a1a2e] antialiased">
        {children}
      </body>
    </html>
  )
}
