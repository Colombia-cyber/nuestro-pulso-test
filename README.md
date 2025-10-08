# Nuestro Pulso

The open, civic web platform for Colombia & the world — modern, extensible, Google-style UI.

## Features

- 🇨🇴/🌎 Toggle for local (Colombia) and world news
- Universal search bar
- Responsive, accessible, mobile-first layout
- API-ready (just add your keys in `.env`)
- Fully open, easily extended (add debates, voting, YouTube, etc.)

## Setup

1. Clone the repo  
   `git clone https://github.com/Colombia-cyber/nuestro-pulso-test.git`
2. Install dependencies  
   `npm install`
3. Copy `.env.example` to `.env.local` and add your API keys
4. Run the dev server  
   `npm run dev`

## Customization

- To connect real news APIs, update the API fetch logic in `src/pages/index.tsx`
- For new features, add pages/components as needed
- All config via `.env.local`

## Deployment

- Deploy on Vercel, Netlify, or your favorite host!

## Contributing

PRs and issues welcome. Let’s build the best civic platform together!

## License

MIT
