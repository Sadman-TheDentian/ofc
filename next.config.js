const { PHASE_DEVELOPMENT_SERVER } = require('next/constants');

/** @type {import('next').NextConfig} */
const nextConfig = (phase, { defaultConfig }) => {
  return {
    ...defaultConfig,
    images: {
      remotePatterns: [
        {
          protocol: 'https',
          hostname: 'blogger.googleusercontent.com',
          port: '',
          pathname: '/**',
        },
        {
          protocol: 'https',
          hostname: 'cdn.sanity.io',
          port: '',
          pathname: '/**',
        },
        {
          protocol: 'https',
          hostname: 'picsum.photos',
          port: '',
          pathname: '/**',
        },
        {
          protocol: 'https',
          hostname: 'images.unsplash.com',
          port: '',
          pathname: '/**',
        },
      ],
    },
    webpack: (config, { isServer }) => {
      if (isServer) {
        config.externals.push('framer-motion');
      }
      return config;
    },
  };
};

module.exports = nextConfig;
