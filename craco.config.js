const path = require('path');

module.exports = {
  webpack: {
    configure: (webpackConfig) => {
      // Find the rule that's causing the issue
      const rule = webpackConfig.module.rules[1].oneOf[3];
      
      // Convert the relative path to an absolute path
      rule.include = path.resolve(__dirname, './frontend/src');

      return webpackConfig;
    },
  },
  // Add this new section
  paths: {
    appPath: path.resolve(__dirname, 'frontend'),
    appPublic: path.resolve(__dirname, 'frontend/public'),
    appHtml: path.resolve(__dirname, 'frontend/public/index.html'),
    appIndexJs: path.resolve(__dirname, 'frontend/src/index.js'),
    appSrc: path.resolve(__dirname, 'frontend/src'),
    appBuild: path.resolve(__dirname, 'frontend/build'),
  },
};