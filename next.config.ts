import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Render serves this as a Static Site, so the build has to emit plain files
  // into out/ rather than the .next/ bundle a Node server would run.
  output: "export",
  images: {
    // There's no image optimizer behind a static export; every <Image> must be
    // served as-is. Both current usages already pass `unoptimized`, this makes
    // it impossible to forget on the next one.
    unoptimized: true,
  },
};

export default nextConfig;
