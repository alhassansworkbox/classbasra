# كلاس لطب الاسنان — صفحة تقييم المرضى

نظام تقييم مريح وأنيق لعيادة Class Dental Clinic — يجمع آراء المرضى ويحفظها مباشرة في Notion.

---

## Tech Stack

- **Next.js 15** (App Router)
- **TypeScript**
- **Tailwind CSS**
- **Notion API** (`@notionhq/client`)
- **RTL Arabic** (Cairo font)

---

## Quick Start

### 1. Clone & Install

```bash
git clone <your-repo-url>
cd class-dental-feedback
npm install
```

### 2. Create Notion Database

Create a new Notion database named **Class Dental Clinic Feedback** with these properties:

| Property Name | Type |
|---|---|
| Full Name | Title |
| Phone Number | Phone |
| Clinic Design Rating | Number |
| Cleanliness Rating | Number |
| Comfort Rating | Number |
| Reception Rating | Number |
| Appointment Rating | Number |
| Doctor Communication Rating | Number |
| Attention To Detail Rating | Number |
| Overall Experience Rating | Number |
| Favorite Part | Rich Text |
| Improvement Suggestions | Rich Text |
| Recommendation Score | Number |
| Submission Date | Created Time |

### 3. Connect Notion Integration

1. Go to [notion.so/my-integrations](https://www.notion.so/my-integrations)
2. Create a new integration, copy the **Internal Integration Token**
3. Open your database → click `···` → **Add connections** → select your integration
4. Copy your **database ID** from the URL:
   `https://notion.so/workspace/**DATABASE_ID**?v=...`

### 4. Environment Variables

```bash
cp .env.example .env.local
```

Edit `.env.local`:

```
NOTION_TOKEN=secret_your_token_here
NOTION_DATABASE_ID=your_database_id_here
```

### 5. Run Locally

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

---

## Deploy to Render

1. Push to GitHub
2. Go to [render.com](https://render.com) → **New Web Service**
3. Connect your GitHub repo
4. Settings:
   - **Build Command:** `npm install && npm run build`
   - **Start Command:** `npm start`
   - **Environment:** Node
5. Add environment variables:
   - `NOTION_TOKEN`
   - `NOTION_DATABASE_ID`
6. Deploy ✓

---

## Project Structure

```
src/
├── app/
│   ├── layout.tsx          # Root layout (Cairo font, RTL)
│   ├── page.tsx            # Hero + Feedback form page
│   ├── globals.css         # Tailwind + global styles
│   ├── success/
│   │   └── page.tsx        # Success confirmation page
│   └── api/
│       └── submit/
│           └── route.ts    # POST handler → Notion API
├── components/
│   ├── FeedbackForm.tsx    # Main form with validation
│   ├── StarRating.tsx      # 1–5 star rating component
│   └── ScaleRating.tsx     # 0–10 NPS scale component
└── lib/
    └── notion.ts           # Notion client + saveFeedback()
```

---

## Contact

- **Instagram:** [@classdentalcare_basra](https://instagram.com/classdentalcare_basra)
- **Phone:** 07772020010
