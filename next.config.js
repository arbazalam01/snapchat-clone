const withPWA = require("next-pwa")({
  dest: "public",
});

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
      },
    ],
  },
};

const pwaConfig = withPWA({ nextConfig });

// module.exports = withPWA({
//   // next.js config
//   nextConfig,
// });

// module.exports = nextConfig;

module.exports = pwaConfig;
