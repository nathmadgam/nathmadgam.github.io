import { NextRequest, NextResponse } from "next/server";

const ID_PATTERN = /^\d{1,20}$/;
const ROBLOX_HEADERS = { Accept: "application/json", "User-Agent": "CynexPortfolio/2.0" };

async function readJson<T>(url: string): Promise<T> {
  const response = await fetch(url, {
    headers: ROBLOX_HEADERS,
    next: { revalidate: 21600 },
    signal: AbortSignal.timeout(8000),
  });
  if (!response.ok) throw new Error(`Roblox API returned ${response.status}`);
  return response.json() as Promise<T>;
}

export async function GET(request: NextRequest) {
  const placeId = request.nextUrl.searchParams.get("placeId");
  const suppliedUniverseId = request.nextUrl.searchParams.get("universeId");
  const groupId = request.nextUrl.searchParams.get("groupId");

  try {
    if (groupId) {
      if (!ID_PATTERN.test(groupId)) return NextResponse.json({ error: "Invalid group ID" }, { status: 400 });
      const payload = await readJson<{ data?: Array<{ imageUrl?: string; state?: string }> }>(
        `https://thumbnails.roblox.com/v1/groups/icons?groupIds=${groupId}&size=420x420&format=WebP&isCircular=false`,
      );
      const image = payload.data?.[0];
      return NextResponse.json({ imageUrl: image?.state === "Completed" ? image.imageUrl : null, state: image?.state ?? "Unavailable" });
    }

    if (!placeId || !ID_PATTERN.test(placeId)) {
      return NextResponse.json({ error: "A valid placeId is required" }, { status: 400 });
    }

    let universeId = suppliedUniverseId;
    if (!universeId) {
      const universe = await readJson<{ universeId?: number }>(`https://apis.roblox.com/universes/v1/places/${placeId}/universe`);
      universeId = universe.universeId ? String(universe.universeId) : null;
    }

    if (!universeId || !ID_PATTERN.test(universeId)) {
      return NextResponse.json({ imageUrl: null, state: "InvalidUniverse" }, { status: 404 });
    }

    const payload = await readJson<{ data?: Array<{ imageUrl?: string; state?: string }> }>(
      `https://thumbnails.roblox.com/v1/games/icons?universeIds=${universeId}&returnPolicy=PlaceHolder&size=512x512&format=WebP&isCircular=false`,
    );
    const image = payload.data?.[0];
    return NextResponse.json({ universeId, imageUrl: image?.state === "Completed" ? image.imageUrl : null, state: image?.state ?? "Unavailable" });
  } catch (error) {
    console.error("[roblox-thumbnail] External media request failed", error);
    return NextResponse.json({ imageUrl: null, state: "Unavailable" }, { status: 502 });
  }
}
