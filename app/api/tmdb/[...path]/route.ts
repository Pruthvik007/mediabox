import { NextRequest, NextResponse } from "next/server";
import { createLogger } from "@pruthvik007/utils";

const logger = createLogger("tmdb-proxy");
const TMDB_BASE = "https://api.themoviedb.org/3";

/**
 * Catch-all TMDB proxy route.
 * - Injects API key server-side (never reaches the browser)
 * - Caches responses for 24 hours
 *
 * Example:
 *   Client: GET /api/tmdb/movie/popular?page=1
 *   Proxy:  GET https://api.themoviedb.org/3/movie/popular?page=1&api_key=xxx
 */
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ path: string[] }> }
) {
  const { path } = await params;
  const tmdbPath = path.join("/");
  const searchParams = request.nextUrl.searchParams;

  const url = new URL(`${TMDB_BASE}/${tmdbPath}`);
  searchParams.forEach((value, key) => url.searchParams.set(key, value));
  url.searchParams.set("api_key", process.env.TMDB_API_KEY!);

  try {
    const res = await fetch(url.toString());
    const data = await res.json();

    if (!res.ok) {
      logger.error({ status: res.status, tmdbPath }, "TMDB proxy error");
      return NextResponse.json(data, { status: res.status });
    }

    return NextResponse.json(data, {
      headers: {
        "Cache-Control": "public, s-maxage=86400, stale-while-revalidate=3600",
      },
    });
  } catch (error) {
    logger.error({ tmdbPath, error: String(error) }, "TMDB proxy fetch failed");
    return NextResponse.json(
      { error: "Failed to fetch from TMDB" },
      { status: 502 }
    );
  }
}
