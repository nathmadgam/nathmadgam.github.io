import { NextResponse } from "next/server";
import { getPrisma } from "@/lib/prisma";

export const runtime = "nodejs";

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as Record<string, unknown>;
    const name = String(body.name ?? "").trim();
    const email = String(body.email ?? "").trim().toLowerCase();
    const discord = String(body.discord ?? "").trim();
    const project = String(body.project ?? "").trim();
    const budget = String(body.budget ?? "").trim();
    const message = String(body.message ?? "").trim();

    if (name.length < 2 || !emailPattern.test(email) || project.length < 2 || message.length < 20) {
      return NextResponse.json({ error: "Please complete all required fields." }, { status: 400 });
    }

    const prisma = getPrisma();
    const inquiry = await prisma.inquiry.create({
      data: {
        name: name.slice(0, 120),
        email: email.slice(0, 254),
        discord: discord ? discord.slice(0, 120) : null,
        project: project.slice(0, 160),
        budget: budget ? budget.slice(0, 80) : null,
        message: message.slice(0, 6000),
      },
      select: { id: true, createdAt: true },
    });

    return NextResponse.json({ ok: true, inquiry }, { status: 201 });
  } catch (error) {
    console.error("[inquiries] Failed to save inquiry", error);
    return NextResponse.json({ error: "Inquiry storage is temporarily unavailable." }, { status: 503 });
  }
}
