# OpenClaw---Mac-Mini-
Se va a crear un asistente OpenClaw el cual se va a alojar en una Mac Mini, debe cumplir con un flujo de trabajo BASADO EN: ( Automated agent system that scrapes Google Maps,  visually qualifies leads, generates professional  website redesigns and deploys them live via Vercel  — all hands-free using Claude AI + Apify + Instantly.) 




# OpenClaw — Mac Mini Agent Toolkit

AI-powered pipeline that finds local businesses with outdated websites, auto-generates professional redesigns and delivers them as live demos to close more clients — fully automated.

## Stack

- **Claude AI (OpenClaw)** — agent orchestration & website generation
- **Apify** — Google Maps scraping & lead extraction  
- **Playwright** — visual screenshot & lead qualification
- **Instantly.AI** — cold email outreach campaigns
- **Vercel** — automated site deployment
- **Telegram** — real-time notifications

## PIPELINE 
1. Google maps (Apify)
2. Visual Qualification (Claude Vision + Playwright)
3. Website Redesign (Claude AI)
4. Live Deploy (Vercel)
5. Cold Email (Instantly.AI)
6. Notification (Telegram)


## Environment Variables
```bash
NONE , TRANSFER TO .env 

## Usage
```bash
# Install dependencies
npm install

# Test run (3 leads, no deploy or emails)
node orchestrator.js --test --dry

# Full production run
node orchestrator.js
```

## Daily Output

- **50** businesses scraped from Google Maps
- **~23** visually qualified leads
- **~23** professional sites generated & deployed
- **~23** cold emails sent via Instantly.AI
- Real-time Telegram summary on completion

## Security

- Never commit `.env` to the repo
- SSH key-only access to Mac Mini
- Separate sending domain for cold emails
- Demo footer on all generated sites

## Status
 In development (PHASE 1)
