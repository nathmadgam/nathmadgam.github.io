import { NextRequest, NextResponse } from "next/server";

const INVITE_PATTERN = /^[A-Za-z0-9-]{2,32}$/;

export async function GET(request: NextRequest) {
  const inviteCode = request.nextUrl.searchParams.get("inviteCode")?.trim();
  if (!inviteCode || !INVITE_PATTERN.test(inviteCode)) {
    return NextResponse.json({ error: "Invalid invite code" }, { status: 400 });
  }

  try {
    const response = await fetch(`https://discord.com/api/v10/invites/${encodeURIComponent(inviteCode)}?with_counts=true`, {
      headers: { Accept: "application/json", "User-Agent": "CynexPortfolio/2.0" },
      next: { revalidate: 21600 },
      signal: AbortSignal.timeout(8000),
    });
    if (!response.ok) throw new Error(`Discord API returned ${response.status}`);

    const payload = (await response.json()) as {
      guild?: { id?: string; icon?: string; name?: string };
      approximate_member_count?: number;
      approximate_presence_count?: number;
    };
    const guild = payload.guild;
    if (!guild?.id || !guild.icon) {
      return NextResponse.json({ imageUrl: null, guildName: guild?.name ?? null, state: "NoIcon" });
    }

    const extension = guild.icon.startsWith("a_") ? "gif" : "webp";
    const imageUrl = `https://cdn.discordapp.com/icons/${guild.id}/${guild.icon}.${extension}?size=256`;
    return NextResponse.json({
      imageUrl,
      guildName: guild.name ?? null,
      animated: extension === "gif",
      memberCount: payload.approximate_member_count ?? null,
      onlineCount: payload.approximate_presence_count ?? null,
    });
  } catch (error) {
    console.error("[discord-icon] External metadata request failed", error);
    return NextResponse.json({ imageUrl: null, state: "Unavailable" }, { status: 502 });
  }
}
