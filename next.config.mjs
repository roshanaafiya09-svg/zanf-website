/** @type {import('next').NextConfig} */
const nextConfig = {
  // The live site serves every page with a trailing slash. Keeping that exact
  // shape means no redirects and no lost rankings on the rebuild.
  trailingSlash: true,
  images: {
    formats: ['image/avif', 'image/webp'],
  },
}

export default nextConfig
