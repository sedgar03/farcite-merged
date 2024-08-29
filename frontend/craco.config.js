const path = require('path');

module.exports = {
  webpack: {
    configure: (webpackConfig) => {
      // Modify the include path for the babel-loader
      webpackConfig.module.rules[1].oneOf.forEach((rule) => {
        if (rule.loader && rule.loader.includes('babel-loader')) {
          rule.include = path.resolve(__dirname, 'src');
        }
      });

      // Modify the output path
      webpackConfig.output.path = path.resolve(__dirname, 'build');

      webpackConfig.resolve.extensions = ['.ts', '.tsx', '.js', '.jsx', '.json'];

      return webpackConfig;
    },
  },
  paths: {
    appPath: __dirname,
    appBuild: path.resolve(__dirname, 'build'),
    appPublic: path.resolve(__dirname, 'public'),
    appHtml: path.resolve(__dirname, 'public/index.html'),
    appIndexJs: path.resolve(__dirname, 'src/index.js'),
    appSrc: path.resolve(__dirname, 'src'),
  },
};