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
      // This is the correct configuration to externalize framer-motion
      // for the server build, which resolves the "export *" error.
      if (isServer) {
        config.externals.push('framer-motion');
      }
      return config;
    },
  };
};

module.exports = nextConfig;
