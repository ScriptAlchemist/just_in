module.exports = {
  output: "export",
  basePath: "",
  assetPrefix: "",
  images: {
    path: "/assets",
    loader: "default",
    unoptimized: true,
  },
  webpack: (config, { isServer }) => {
    // Handle canvas for pdfjs-dist
    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        canvas: false,
        fs: false,
      };
    }

    return config;
  },
};
