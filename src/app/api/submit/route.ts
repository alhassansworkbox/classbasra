import { NextRequest, NextResponse } from 'next/server'
import { saveFeedback, FeedbackPayload } from '@/lib/notion'

export async function POST(req: NextRequest) {
  try {
    const body: FeedbackPayload = await req.json()

    // Validate required fields
    if (!body.fullName?.trim())  return NextResponse.json({ error: 'الاسم مطلوب' }, { status: 400 })
    if (!body.phone?.trim())     return NextResponse.json({ error: 'رقم الهاتف مطلوب' }, { status: 400 })
    if (body.recommendScore === undefined || body.recommendScore === null)
      return NextResponse.json({ error: 'تقييم التوصية مطلوب' }, { status: 400 })
    if (!body.favoritePart?.trim())
      return NextResponse.json({ error: 'الحقل المطلوب فارغ' }, { status: 400 })

    // Validate ratings 1-5
    const ratings: Array<keyof FeedbackPayload> = [
      'clinicDesign','cleanliness','comfort','reception',
      'appointment','doctorComm','attentionToDetail','overallExperience',
    ]
    for (const r of ratings) {
      const v = body[r] as number
      if (!v || v < 1 || v > 5)
        return NextResponse.json({ error: 'يرجى تقييم جميع الأسئلة' }, { status: 400 })
    }

    // Validate NPS 0-10
    if (body.recommendScore < 0 || body.recommendScore > 10)
      return NextResponse.json({ error: 'تقييم التوصية يجب أن يكون بين 0 و 10' }, { status: 400 })

    await saveFeedback(body)
    return NextResponse.json({ success: true })
  } catch (err) {
    console.error('[submit]', err)
    return NextResponse.json({ error: 'حدث خطأ، يرجى المحاولة مجدداً' }, { status: 500 })
  }
}
