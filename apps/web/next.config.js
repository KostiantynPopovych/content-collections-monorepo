const { withContentCollections } = require("@content-collections/next");

/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ["@repo/mdx"],
};

module.exports = withContentCollections(nextConfig);
