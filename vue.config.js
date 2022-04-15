// const { defineConfig } = require('@vue/cli-service');
module.exports = {
  // transpileDependencies: true,
  devServer: {
    proxy: {
      '/seainfo': {
        target: 'https://www.khoa.go.kr/',
        changeOrigin: true,
        pathRewrite: { '^/seainfo': '' },
      },
    },
    headers: { 'Access-Control-Allow-Origin': '*' },
  },
};
