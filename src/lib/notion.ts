import { Client } from '@notionhq/client'

const notion = new Client({ auth: process.env.NOTION_TOKEN })
const DB_ID  = process.env.NOTION_DATABASE_ID!

export interface FeedbackPayload {
  fullName:           string
  phone:              string
  clinicDesign:       number
  cleanliness:        number
  comfort:            number
  reception:          number
  appointment:        number
  doctorComm:         number
  attentionToDetail:  number
  overallExperience:  number
  favoritePart:       string
  improvements:       string
  recommendScore:     number
}

export async function saveFeedback(data: FeedbackPayload) {
  return notion.pages.create({
    parent: { database_id: DB_ID },
    properties: {
      'Full Name': {
        title: [{ text: { content: data.fullName } }],
      },
      'Phone Number': {
        phone_number: data.phone,
      },
      'Clinic Design Rating': {
        number: data.clinicDesign,
      },
      'Cleanliness Rating': {
        number: data.cleanliness,
      },
      'Comfort Rating': {
        number: data.comfort,
      },
      'Reception Rating': {
        number: data.reception,
      },
      'Appointment Rating': {
        number: data.appointment,
      },
      'Doctor Communication Rating': {
        number: data.doctorComm,
      },
      'Attention To Detail Rating': {
        number: data.attentionToDetail,
      },
      'Overall Experience Rating': {
        number: data.overallExperience,
      },
      'Favorite Part': {
        rich_text: [{ text: { content: data.favoritePart } }],
      },
      'Improvement Suggestions': {
        rich_text: [{ text: { content: data.improvements || '' } }],
      },
      'Recommendation Score': {
        number: data.recommendScore,
      },
    },
  })
}
