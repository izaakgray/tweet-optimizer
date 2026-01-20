# Tweet Optimizer

Simple AI tweet copy optimizer built for easy deployment on Vercel.

## Setup

1. Install dependencies:
   - `npm install`
2. Create a `.env.local` file with:
   - `OPENAI_API_KEY=your_key_here`
   - `OPENAI_MODEL=gpt-4o-mini` (optional)
3. Put your long prompt in `prompts/tweet_prompt.txt`
4. Run locally:
   - `npm run dev`

## Deploy to Vercel

- Import the repo in Vercel
- Add the same environment variables in the Vercel project settings
- Ensure `prompts/tweet_prompt.txt` is committed (Vercel reads it at runtime)
- Deploy
# tweet-optimizer
