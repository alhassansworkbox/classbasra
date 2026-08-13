'use client'

interface Props {
  value: number | null
  onChange: (v: number) => void
  error?: boolean
}

export default function ScaleRating({ value, onChange, error }: Props) {
  return (
    <div className="space-y-3">
      <div className="flex gap-1.5 flex-wrap" dir="ltr">
        {Array.from({ length: 11 }, (_, i) => i).map((n) => {
          const selected = value === n
          const color = n >= 9 ? 'bg-[#2D377E] text-white border-[#2D377E]'
                      : n >= 7 ? 'bg-[#EEF0F9] text-[#2D377E] border-[#2D377E]'
                      : 'bg-white text-gray-500 border-gray-200'
          return (
            <button
              key={n}
              type="button"
              onClick={() => onChange(n)}
              className={`
                w-10 h-10 rounded-xl border-2 text-sm font-bold transition-all duration-150
                focus:outline-none focus-visible:ring-2 focus-visible:ring-[#2D377E]
                hover:border-[#2D377E] hover:text-[#2D377E] active:scale-95
                ${selected ? 'bg-[#2D377E] text-white border-[#2D377E] shadow-md scale-105' : color}
                ${error && value === null ? 'border-red-300' : ''}
              `}
              aria-label={String(n)}
              aria-pressed={selected}
            >
              {n}
            </button>
          )
        })}
      </div>
      <div className="flex justify-between text-xs text-gray-400 px-1" dir="rtl">
        <span>غير محتمل إطلاقاً</span>
        <span>محتمل جداً</span>
      </div>
    </div>
  )
}
