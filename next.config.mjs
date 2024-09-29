/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: (config, { isServer }) => {
    if (isServer) {
      if (Array.isArray(config.resolve.alias))
        config.resolve.alias.push({ name: "msw/browser", alias: false });
      else config.resolve.alias["msw/browser"] = false;
    } else {
      if (Array.isArray(config.resolve.alias))
        config.resolve.alias.push({ name: "msw/node", alias: false });
      else config.resolve.alias["msw/node"] = false;
    }
    return config;
  },
  images: {
    domains: ["images.unsplash.com", "plus.unsplash.com", "www.50plus.or.kr"],
  },
};

export default nextConfig;
