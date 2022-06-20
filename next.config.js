/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['cdn.coinranking.com'],
    dangerouslyAllowSVG: true
  }
}

module.exports = nextConfig
