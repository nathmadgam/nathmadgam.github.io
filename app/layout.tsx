import type { Metadata } from "next";
import { assetPath } from "@/lib/paths";
import "./globals.css";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://nathmadgam.github.io";
const avatarUrl = new URL(assetPath("/images/avatar.webp"), siteUrl).toString();

export const metadata: Metadata = {
  title: "Cynex | Roblox Scripter Portfolio",
  description: "Roblox programming, gameplay systems, backend development, persistent data, interface work, and selected client projects by Cynex.",
  metadataBase: new URL(siteUrl),
  openGraph: {
    title: "Cynex | Roblox Scripter Portfolio",
    description: "Selected Roblox programming work, live experiences, technical capabilities, and client feedback.",
    type: "website",
    images: [avatarUrl],
  },
  icons: { icon: assetPath("/assets/fallbacks/cynex-mark.svg") },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
