# MediaBox

Browse movies and TV shows. Built with Next.js 16, powered by TMDB API.

## Tech Stack

| Tech | Version |
|------|---------|
| Next.js | 16 |
| React | 19 |
| TypeScript | 5.x |
| Tailwind CSS | v4 |
| UI Components | @pruthvik007/components |
| Utilities | @pruthvik007/utils |

## Features

- Browse by category: Discover, Popular, Trending, Now Playing, Top Rated, Upcoming
- Movie and TV show details with trailers, recommendations, cast
- Search with debounce and infinite scroll
- Advanced filtering by genre and sort order
- Watchlist (localStorage)
- Dark/light theme
- TMDB API key hidden server-side (API routes proxy all TMDB calls)

## Local Development

```bash
git clone git@github.com:Pruthvik007/mediabox.git
cd mediabox
npm install
```

Create `.env.local`:
```
TMDB_API_KEY=your_tmdb_api_key
```

```bash
npm run dev    # http://localhost:3000
```

## Deployment

Deployed on **Vercel**. Connect the repo, set `TMDB_API_KEY` as an environment variable.

Vercel auto-deploys on push to `main`.

## CI/CD

Build check on every push to `main`. Vercel handles deployment.

**Secrets needed:**
- `PACKAGES_TOKEN` — for @pruthvik007 npm packages
- `TMDB_API_KEY` — for build-time TMDB access (server components)

## Project Structure

```
app/
├── page.tsx                    # Home — 6 category carousels
├── movies/[category]/page.tsx  # Category with infinite scroll + filters
├── shows/[category]/page.tsx   # Same for TV shows
├── details/[type]/[id]/page.tsx # Media details + trailer + recommendations
├── search/page.tsx             # Search with debounce
├── watchlist/page.tsx          # Local watchlist
└── api/tmdb/[...path]/route.ts # TMDB proxy (API key server-side)

lib/tmdb/                       # Types, constants, helpers, server API client
components/                     # All UI components
context/                        # Watchlist + Modal providers
hooks/                          # useWatchlist, useModal
```
