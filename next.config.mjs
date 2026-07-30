/** @type {import('next').NextConfig} */
const nextConfig = {
  // The live site serves every page with a trailing slash. Keeping that shape
  // means the redirects below are the only URL change visitors ever see.
  trailingSlash: true,
  images: {
    formats: ['image/avif', 'image/webp'],
  },
  // The information architecture changed; the old URLs did not stop existing.
  // 301 so rankings and inbound links follow the content to its new home.
  async redirects() {
    return [
      { source: '/about-us', destination: '/about/', permanent: true },
      { source: '/our-services', destination: '/services/', permanent: true },
      { source: '/contact-us', destination: '/contact/', permanent: true },
      {
        source: '/government-notification',
        destination: '/compliance/',
        permanent: true,
      },
    ]
  },
}

export default nextConfig
