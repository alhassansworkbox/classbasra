'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import StarRating from './StarRating'
import ScaleRating from './ScaleRating'

interface FormData {
  fullName:          string
  phone:             string
  clinicDesign:      number
  cleanliness:       number
  comfort:           number
  reception:         number
  appointment:       number
  doctorComm:        number
  attentionToDetail: number
  overallExperience: number
  favoritePart:      string
  improvements:      string
  recommendScore:    number | null
}

const INITIAL: FormData = {
  fullName: '', phone: '',
  clinicDesign: 0, cleanliness: 0, comfort: 0,
  reception: 0, appointment: 0, doctorComm: 0,
  attentionToDetail: 0, overallExperience: 0,
  favoritePart: '', improvements: '', recommendScore: null,
}

const STAR_QUESTIONS: { key: keyof FormData; label: string }[] = [
  { key: 'clinicDesign',      label: 'كيف تقيم تصميم العيادة والأجواء العامة؟' },
  { key: 'cleanliness',       label: 'كيف تقيم مستوى النظافة والترتيب؟' },
  { key: 'comfort',           label: 'كيف تقيم مستوى الراحة والخصوصية أثناء زيارتك؟' },
  { key: 'reception',         label: 'كيف تقيم تعامل فريق الاستقبال؟' },
  { key: 'appointment',       label: 'كيف تقيم التزام العيادة بالمواعيد؟' },
  { key: 'doctorComm',        label: 'كيف تقيم اهتمام الطبيب بشرح حالتك وخطة العلاج؟' },
  { key: 'attentionToDetail', label: 'كيف تقيم مستوى العناية بالتفاصيل أثناء زيارتك؟' },
  { key: 'overallExperience', label: 'كيف تقيم تجربتك العامة في العيادة؟' },
]

export default function FeedbackForm() {
  const router  = useRouter()
  const [form, setForm]           = useState<FormData>(INITIAL)
  const [errors, setErrors]       = useState<Partial<Record<keyof FormData, string>>>({})
  const [loading, setLoading]     = useState(false)
  const [submitErr, setSubmitErr] = useState('')

  function set<K extends keyof FormData>(key: K, value: FormData[K]) {
    setForm(prev => ({ ...prev, [key]: value }))
    setErrors(prev => { const next = { ...prev }; delete next[key]; return next })
  }

  function validate(): boolean {
    const e: Partial<Record<keyof FormData, string>> = {}
    if (!form.fullName.trim())  e.fullName = 'الاسم مطلوب'
    if (!form.phone.trim())     e.phone    = 'رقم الهاتف مطلوب'
    for (const q of STAR_QUESTIONS) {
      if (!form[q.key] || (form[q.key] as number) < 1) e[q.key] = 'هذا التقييم مطلوب'
    }
    if (!form.favoritePart.trim())  e.favoritePart  = 'هذا الحقل مطلوب'
    if (form.recommendScore === null) e.recommendScore = 'هذا التقييم مطلوب'
    setErrors(e)
    return Object.keys(e).length === 0
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!validate()) {
      const firstErr = document.querySelector('[data-error="true"]')
      firstErr?.scrollIntoView({ behavior: 'smooth', block: 'center' })
      return
    }
    setLoading(true)
    setSubmitErr('')
    try {
      const res  = await fetch('/api/submit', {
        method:  'POST',
        headers: { 'Content-Type': 'application/json' },
        body:    JSON.stringify({ ...form }),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error || 'حدث خطأ')
      router.push('/success')
    } catch (err: unknown) {
      setSubmitErr(err instanceof Error ? err.message : 'حدث خطأ، يرجى المحاولة مجدداً')
    } finally {
      setLoading(false)
    }
  }

  return (
    <form
      id="feedback-form"
      onSubmit={handleSubmit}
      noValidate
      className="max-w-2xl mx-auto space-y-8"
    >
      {/* ── Personal Info ──────────────────────────────────────── */}
      <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-sm border border-gray-100">
        <h2 className="text-lg font-bold text-[#2D377E] mb-6">معلوماتك الشخصية</h2>
        <div className="space-y-5">
          <Field
            label="الاسم الكامل"
            required
            error={errors.fullName}
          >
            <input
              type="text"
              value={form.fullName}
              onChange={e => set('fullName', e.target.value)}
              placeholder="أدخل اسمك الكامل"
              className={inputCls(!!errors.fullName)}
              data-error={!!errors.fullName}
            />
          </Field>
          <Field label="رقم الهاتف" required error={errors.phone}>
            <input
              type="tel"
              value={form.phone}
              onChange={e => set('phone', e.target.value)}
              placeholder="07X XXXX XXXX"
              dir="ltr"
              className={inputCls(!!errors.phone) + ' text-left'}
              data-error={!!errors.phone}
            />
          </Field>
        </div>
      </div>

      {/* ── Star Ratings ───────────────────────────────────────── */}
      <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-sm border border-gray-100">
        <h2 className="text-lg font-bold text-[#2D377E] mb-6">تقييم التجربة</h2>
        <div className="space-y-7">
          {STAR_QUESTIONS.map((q, idx) => (
            <div key={q.key} data-error={!!errors[q.key]}>
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-1">
                <label className="text-sm font-semibold text-gray-700 leading-relaxed">
                  <span className="text-[#2D377E] font-bold ml-1.5">{idx + 1}.</span>
                  {q.label}
                </label>
                <StarRating
                  value={form[q.key] as number}
                  onChange={v => set(q.key, v)}
                  error={!!errors[q.key]}
                />
              </div>
              {errors[q.key] && <p className="text-xs text-red-500 mt-1">{errors[q.key]}</p>}
            </div>
          ))}
        </div>
      </div>

      {/* ── Open Questions ─────────────────────────────────────── */}
      <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-sm border border-gray-100">
        <h2 className="text-lg font-bold text-[#2D377E] mb-6">ملاحظاتك</h2>
        <div className="space-y-5">
          <Field
            label="ما أكثر شيء أعجبك في تجربتك؟"
            required
            error={errors.favoritePart}
          >
            <textarea
              value={form.favoritePart}
              onChange={e => set('favoritePart', e.target.value)}
              placeholder="شاركنا ما أضاف قيمة لتجربتك..."
              rows={3}
              className={inputCls(!!errors.favoritePart) + ' resize-none'}
              data-error={!!errors.favoritePart}
            />
          </Field>
          <Field
            label="ما الشيء الذي يمكننا تحسينه؟"
            error={errors.improvements}
          >
            <textarea
              value={form.improvements}
              onChange={e => set('improvements', e.target.value)}
              placeholder="ملاحظاتك تساعدنا على التطوير المستمر..."
              rows={3}
              className={inputCls(false) + ' resize-none'}
            />
          </Field>
        </div>
      </div>

      {/* ── NPS ────────────────────────────────────────────────── */}
      <div
        className="bg-white rounded-2xl p-6 sm:p-8 shadow-sm border border-gray-100"
        data-error={!!errors.recommendScore}
      >
        <h2 className="text-lg font-bold text-[#2D377E] mb-2">التوصية</h2>
        <p className="text-sm text-gray-500 mb-5 leading-relaxed">
          ما مدى احتمالية أن توصي بالعيادة لأحد أفراد عائلتك أو أصدقائك؟
        </p>
        <ScaleRating
          value={form.recommendScore}
          onChange={v => set('recommendScore', v)}
          error={!!errors.recommendScore}
        />
        {errors.recommendScore && (
          <p className="text-xs text-red-500 mt-2">{errors.recommendScore}</p>
        )}
      </div>

      {/* ── Submit ─────────────────────────────────────────────── */}
      {submitErr && (
        <div className="bg-red-50 border border-red-200 rounded-xl p-4 text-red-700 text-sm text-center">
          {submitErr}
        </div>
      )}

      <button
        type="submit"
        disabled={loading}
        className={`
          w-full py-4 rounded-2xl text-white text-lg font-bold transition-all duration-200
          focus:outline-none focus-visible:ring-4 focus-visible:ring-[#2D377E]/30
          ${loading
            ? 'bg-[#7B85B8] cursor-not-allowed'
            : 'bg-[#2D377E] hover:bg-[#3D4A9A] active:scale-[0.99] shadow-lg hover:shadow-xl'
          }
        `}
      >
        {loading ? (
          <span className="flex items-center justify-center gap-2">
            <svg className="animate-spin h-5 w-5 text-white" viewBox="0 0 24 24" fill="none">
              <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" strokeDasharray="30 60" />
            </svg>
            جاري الإرسال...
          </span>
        ) : 'إرسال التقييم'}
      </button>

      <p className="text-center text-xs text-gray-400 pb-4">
        معلوماتك سرية ولن تُشارك مع أي جهة خارجية
      </p>
    </form>
  )
}

// ── Helpers ──────────────────────────────────────────────────────────────────
function inputCls(hasError: boolean) {
  return `w-full px-4 py-3 rounded-xl border text-sm transition-all duration-150 outline-none
    focus:ring-2 focus:ring-[#2D377E]/20 focus:border-[#2D377E]
    ${hasError
      ? 'border-red-300 bg-red-50 focus:ring-red-200 focus:border-red-400'
      : 'border-gray-200 bg-gray-50 focus:bg-white'
    }`
}

function Field({
  label, required, error, children,
}: {
  label: string; required?: boolean; error?: string; children: React.ReactNode
}) {
  return (
    <div>
      <label className="block text-sm font-semibold text-gray-700 mb-1.5">
        {label}
        {required && <span className="text-[#2D377E] mr-0.5"> *</span>}
      </label>
      {children}
      {error && <p className="text-xs text-red-500 mt-1">{error}</p>}
    </div>
  )
}
