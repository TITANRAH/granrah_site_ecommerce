/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
        path: false,
        os: false,
      };
    }
    return config;
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
        port: "",
        pathname: "**",
      }
      
    ],
  },
  turbopack: {
    rules: {
      // Configuración de reglas de Turbopack
      '*.{js,jsx,ts,tsx}': ['eslint'],
      '*.{css,scss}': ['postcss'],
    },
  },
};

module.exports = nextConfig; 