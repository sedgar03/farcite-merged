const path = require('path');

module.exports = {
  webpack: {
    alias: {
      '@': path.resolve(__dirname, 'frontend/src'),
    },
  },
  paths: {
    appPath: 'frontend',
    appBuild: 'frontend/build',
    appPublic: 'frontend/public',
    appHtml: 'frontend/public/index.html',
    appIndexJs: 'frontend/src/index.js',
    appSrc: 'frontend/src',
  },
  style: {
    postcss: {
      plugins: [require('tailwindcss'), require('autoprefixer')],
    },
  },
};