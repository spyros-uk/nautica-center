/** @type {import('next').NextConfig} */
const nextConfig = {
  /** Static HTML/CSS/JS in `out/` — deploy to Cloudflare Pages, S3, etc. */
  output: 'export',
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    // Required for `output: 'export'` (no built-in image optimization server)
    unoptimized: true,
  },
}

export default nextConfig
