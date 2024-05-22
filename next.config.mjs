/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack(config) {
    config.externals.push("@node-rs/argon2", "@node-rs/bcrypt");
    return config;
  },
  images: {
    domains: ["utfs.io", "picsum.photos"],
  },
};

export default nextConfig;
