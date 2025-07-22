import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    images: {
        domains: ["ui-avatars.com"],
    },
    eslint: {
        ignoreDuringBuilds: true,
    },
};

export default nextConfig;
