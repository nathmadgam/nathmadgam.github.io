import type { NextConfig } from "next";

const repository = process.env.GITHUB_REPOSITORY?.split("/")[1] ?? "";
const owner = process.env.GITHUB_REPOSITORY_OWNER ?? "nathmadgam";
const isUserOrOrgSite = repository.toLowerCase().endsWith(".github.io");
const inferredBasePath = process.env.GITHUB_ACTIONS === "true" && repository && !isUserOrOrgSite
  ? `/${repository}`
  : "";
const basePath = (process.env.NEXT_PUBLIC_BASE_PATH ?? inferredBasePath).replace(/\/$/, "");
const siteUrl = process.env.NEXT_PUBLIC_SITE_URL
  ?? (isUserOrOrgSite
    ? `https://${owner}.github.io`
    : basePath
      ? `https://${owner}.github.io${basePath}`
      : "http://localhost:3000");

const nextConfig: NextConfig = {
  output: "export",
  trailingSlash: true,
  poweredByHeader: false,
  basePath,
  images: {
    unoptimized: true,
  },
  env: {
    NEXT_PUBLIC_BASE_PATH: basePath,
    NEXT_PUBLIC_SITE_URL: siteUrl,
  },
};

export default nextConfig;
