/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ["ipfs.moralis.io"],
     remotePatterns: [
      {
        protocol: 'https',
        hostname: 'ipfs.moralis.io',
        port: '',
        pathname: '/ipfs/**',
      },
    ],
  }
}

module.exports = nextConfig
