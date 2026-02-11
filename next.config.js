/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Voorkomt corrupte webpack-cache op Windows (vooral bij paden met spaties)
  webpack: (config, { dev }) => {
    if (dev) {
      config.cache = false;
    }
    return config;
  },
};

module.exports = nextConfig;
