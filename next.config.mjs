// next.config.mjs

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['tylersteeves.netfirms.com'],
  },
  async rewrites() {
    return [
      {
        source: '/api/submit-email',
        destination: 'https://script.google.com/macros/s/AKfycbxi0znhG-vTbp-Ik6mtPnT4uGeQvGNHYPk2JezdnM6GelFdKJxHplkZLRU8Jhwf94p7Lw/exec',
      },
    ]
  },
};

export default nextConfig;