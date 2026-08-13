import Image from 'next/image'
import Link from 'next/link'

export default function SuccessPage() {
  return (
    <main className="min-h-screen bg-[#F5F7FA] flex flex-col items-center justify-center px-4 text-center">

      {/* Success card */}
      <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-10 sm:p-14 max-w-md w-full">

        {/* Logo */}
        <div className="flex justify-center mb-8">
          <div className="relative w-20 h-20">
            <Image src="/logo.jpg" alt="Class Dental Clinic" fill className="object-contain" />
          </div>
        </div>

        {/* Animated checkmark */}
        <div className="flex justify-center mb-8">
          <div className="w-20 h-20 rounded-full bg-[#EEF0F9] flex items-center justify-center">
            <svg
              className="w-10 h-10 text-[#2D377E]"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M20 6L9 17l-5-5" />
            </svg>
          </div>
        </div>

        {/* Message */}
        <h1 className="text-2xl font-extrabold text-[#1a1a2e] mb-3">
          شكراً لمشاركتنا رأيك
        </h1>
        <p className="text-gray-500 text-base leading-relaxed mb-8">
          تم استلام تقييمك بنجاح.
          <br />
          ملاحظاتك تساعدنا على تقديم تجربة أفضل لكل مريض.
        </p>

        {/* Divider */}
        <div className="border-t border-gray-100 pt-8">
          <Link
            href="/"
            className="
              inline-block text-[#2D377E] text-sm font-semibold
              hover:underline underline-offset-2 transition-all
              focus:outline-none focus-visible:ring-2 focus-visible:ring-[#2D377E]
              rounded px-2 py-1
            "
          >
            ← تقييم آخر
          </Link>
        </div>
      </div>

      {/* Footer */}
      <p className="mt-8 text-xs text-gray-400">
        كلاس لطب الاسنان · البصرة ·{' '}
        <a
          href="https://instagram.com/classdentalcare_basra"
          className="hover:text-[#2D377E] transition-colors"
          target="_blank"
          rel="noopener noreferrer"
        >
          @classdentalcare_basra
        </a>
      </p>

    </main>
  )
}
