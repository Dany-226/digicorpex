import createMDX from '@next/mdx'

/** @type {import('next').NextConfig} */
const nextConfig = {
  // Use STATIC_EXPORT=1 for Cloudflare Pages CI (npm run build:static)
  // Dev and standard builds omit 'output' so API routes work
  ...(process.env.STATIC_EXPORT === '1' ? { output: 'export' } : {}),
  pageExtensions: ['js', 'jsx', 'ts', 'tsx', 'md', 'mdx'],
  images: {
    unoptimized: true,
  },
  // Pages uses public/_redirects; this mirror is only for next dev.
  ...(process.env.STATIC_EXPORT === '1' ? {} : {
    async redirects() {
      return [
        { source: '/services/automatisation', destination: '/agents', permanent: true },
      ]
    },
  }),
}

const withMDX = createMDX({
  options: {
    remarkPlugins: [],
    rehypePlugins: [],
  },
})

export default withMDX(nextConfig)
