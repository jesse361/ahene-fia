# Ahene Fia Events & Conference Hub

A Next.js website for a premium events and conference house. The programme, speakers, ticket prices, and partner marks are **demonstration content** until a real event is confirmed.

## Run locally

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

```bash
npm test
npm run lint
npm run build
npm start
```

Node.js 22 or newer is required. This project was built with Node.js 24 and Next.js 16.

## Environment

Copy `.env.example` to `.env.local`.

| Variable | Required | Purpose |
| --- | --- | --- |
| `NEXT_PUBLIC_SITE_URL` | No | Canonical URL used in metadata, the sitemap, and structured data. Defaults to `http://localhost:3000`. |
| `RESEND_API_KEY` | No | Server-only key for the optional email adapter. |
| `CONTACT_TO_EMAIL` | No | Inbox that receives contact form messages. |
| `CONTACT_FROM_EMAIL` | No | Verified sender address for that provider. |

If any of the three email variables is missing, the contact form still validates and then tells the visitor that the message was **not emailed**. Registration never stores a booking. It returns a demonstration reference and states that no payment was taken and no seat was reserved.

To persist registrations, replace `src/lib/registration/submit.ts` with a server-side database write and return `stored: true` only after that write succeeds. To take payment, verify the ticket and price on the server with a payment provider. Do not collect card numbers in this app. The in-memory rate limit in `src/lib/utils/rate-limit.ts` is per server process and is not enough on its own in production.

## Replace the demonstration

- Event name, dates, timezone, and venue: `src/config/event.ts`
- Speakers: `src/data/speakers.ts`
- Schedule: `src/data/schedule.ts`
- Ticket prices and proposed benefits: `src/data/tickets.ts`
- Sponsors: `src/data/sponsors.ts` (leave empty or add only confirmed partners, with real logo files)
- Public contact details and social links: `src/config/site.ts`

Photography in `public/images` is illustrative stock. Speaker portraits are not photographs of the named sample speakers.

## Routes

`/`, `/speakers`, `/speakers/[slug]`, `/schedule`, `/tickets`, `/contact`, `/about`, `/privacy`, `/terms`, `/api/register`, `/api/contact`, `/api/calendar`, `/sitemap.xml`, `/robots.txt`.
