'use client'
import { useState } from 'react'

interface Props {
  value: number
  onChange: (v: number) => void
  error?: boolean
}

export default function StarRating({ value, onChange, error }: Props) {
  const [hovered, setHovered] = useState(0)

  return (
    <div className="flex gap-1.5" dir="ltr">
      {[1, 2, 3, 4, 5].map((star) => {
        const filled = star <= (hovered || value)
        return (
          <button
            key={star}
            type="button"
            onClick={() => onChange(star)}
            onMouseEnter={() => setHovered(star)}
            onMouseLeave={() => setHovered(0)}
            className={`
              text-3xl transition-all duration-150 focus:outline-none focus-visible:ring-2
              focus-visible:ring-[#2D377E] focus-visible:ring-offset-1 rounded
              ${filled ? 'text-[#2D377E] scale-105' : error ? 'text-red-300' : 'text-gray-300'}
              hover:scale-110 active:scale-95
            `}
            aria-label={`${star} نجوم`}
          >
            ★
          </button>
        )
      })}
    </div>
  )
}
