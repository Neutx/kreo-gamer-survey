/** @type {import('next').NextConfig} */

const nextConfig = {
  reactStrictMode: true,
  output: 'export',
  // This tells Next.js to apply Node.js polyfills for server-side modules
  webpack: (config, { isServer }) => {
    if (!isServer) {
      // Don't resolve these server-only modules on the client
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
        net: false,
        tls: false,
        child_process: false,
        crypto: false,
        stream: false,
        util: false,
        events: false,
        process: false,
        path: false,
        http: false,
        https: false,
        os: false,
        zlib: false,
        buffer: false,
      };
    }
    return config;
  },
};

module.exports = nextConfig; 