/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ["@paper-design/shaders-react"]
};

module.exports = nextConfig;

import('@opennextjs/cloudflare').then(m => m.initOpenNextCloudflareForDev());
