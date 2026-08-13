import Image from 'next/image'
import FeedbackForm from '@/components/FeedbackForm'

export default function Home() {
  return (
    <main className="min-h-screen bg-[#F5F7FA]">

      {/* ── HERO ─────────────────────────────────────────────────── */}
      <section className="relative bg-white border-b border-gray-100">
        {/* Subtle grid pattern */}
        <div
          className="absolute inset-0 opacity-[0.025]"
          style={{
            backgroundImage: `radial-gradient(circle, #2D377E 1px, transparent 1px)`,
            backgroundSize: '28px 28px',
          }}
        />

        <div className="relative max-w-2xl mx-auto px-6 py-16 sm:py-24 text-center">
          {/* Logo */}
          <div className="flex justify-center mb-8">
            <div className="relative w-24 h-24 sm:w-28 sm:h-28">
              <Image
                src="/logo.jpg"
                alt="Class Dental Clinic"
                fill
                className="object-contain"
                priority
              />
            </div>
          </div>

          {/* Clinic name */}
          <p className="text-[#2D377E] text-sm font-semibold tracking-widest mb-4 uppercase">
            Class Dental Clinic
          </p>

          {/* Heading */}
          <h1 className="text-3xl sm:text-4xl font-extrabold text-[#1a1a2e] mb-4 leading-tight">
            تقييم تجربتك
          </h1>

          {/* Subheading */}
          <p className="text-gray-500 text-base sm:text-lg leading-relaxed max-w-md mx-auto mb-10">
            شكراً لاختيارك كلاس لطب الأسنان، يسعدنا معرفة رأيك حول تجربتك معنا.
          </p>

          {/* CTA */}
          <a
            href="#feedback-form"
            className="
              inline-block bg-[#2D377E] text-white text-base font-bold
              px-8 py-3.5 rounded-2xl shadow-lg
              hover:bg-[#3D4A9A] hover:shadow-xl
              active:scale-[0.98] transition-all duration-200
              focus:outline-none focus-visible:ring-4 focus-visible:ring-[#2D377E]/30
            "
          >
            ابدأ التقييم
          </a>
        </div>
      </section>

      {/* ── FORM ─────────────────────────────────────────────────── */}
      <section className="max-w-2xl mx-auto px-4 py-12 sm:py-16">
        <FeedbackForm />
      </section>

      {/* ── FOOTER ───────────────────────────────────────────────── */}
      <footer className="border-t border-gray-200 bg-white py-8 px-4">
        <div className="max-w-2xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-gray-400">
          <span>© 2026 كلاس لطب الاسنان · البصرة</span>
          <div className="flex items-center gap-4">
            <a
              href="https://instagram.com/classdentalcare_basra"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[#2D377E] transition-colors"
            >
              @classdentalcare_basra
            </a>
            <a
              href="tel:07772020010"
              className="hover:text-[#2D377E] transition-colors"
            >
              07772020010
            </a>
          </div>
        </div>
      </footer>

    </main>
  )
}
