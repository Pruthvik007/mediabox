import { NextRequest, NextResponse } from "next/server";
import { createLogger } from "@pruthvik007/utils";

const logger = createLogger("tmdb-proxy");
const TMDB_BASE = "https://api.themoviedb.org/3";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ path: string[] }> }
) {
  const { path } = await params;
  const tmdbPath = path.join("/");
  const searchParams = request.nextUrl.searchParams;

  const url = new URL(`${TMDB_BASE}/${tmdbPath}`);
  searchParams.forEach((value, key) => url.searchParams.set(key, value));

  const apiKey = process.env.TMDB_API_KEY!;
  const isBearer = apiKey.startsWith("ey");
  const headers: Record<string, string> = isBearer
    ? { Authorization: `Bearer ${apiKey}` }
    : {};
  if (!isBearer) {
    url.searchParams.set("api_key", apiKey);
  }

  try {
    const res = await fetch(url.toString(), { headers });
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
