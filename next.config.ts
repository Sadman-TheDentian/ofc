
import type {NextConfig} from 'next';

const nextConfig: NextConfig = {
  /* config options here */
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'placehold.co',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
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
        hostname: 'encrypted-tbn0.gstatic.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'blogger.googleusercontent.com',
        port: '',
        pathname: '/**',
      }
    ],
  },
  async rewrites() {
    return [
      {
        source: '/tools/darkcheck',
        destination: '/tools/darkcheck/index.html',
      },
      {
        source: '/tools/darkcheck/:path*',
        destination: '/tools/darkcheck/index.html',
      },
      {
        source: '/tools/leakscan',
        destination: '/tools/leakscan/index.html',
      },
      {
        source: '/tools/leakscan/:path*',
        destination: '/tools/leakscan/index.html',
      },
      {
        source: '/tools/phishrisk',
        destination: '/tools/phishrisk/index.html',
      },
      {
        source: '/tools/phishrisk/:path*',
        destination: '/tools/phishrisk/index.html',
      },
      {
        source: '/tools/passwordleaker',
        destination: '/tools/passwordleaker/index.html',
      },
       {
        source: '/tools/passwordleaker/:path*',
        destination: '/tools/passwordleaker/index.html',
      },
    ];
  },
};

export default nextConfig;
