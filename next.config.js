
const withPWA = require('next-pwa');
const TsconfigPathsPlugin = require("tsconfig-paths-webpack-plugin");


module.exports = withPWA({
  webpack: config => {
    if (!config.resolve.plugins) {
      config.resolve.plugins = [];
    }

    config.resolve.plugins.push(new TsconfigPathsPlugin());

    return config;
  },
  reactStrictMode: true,
  pwa:{
    dest:"public",
    register: true,
    skipWaiting: true,
  }
})