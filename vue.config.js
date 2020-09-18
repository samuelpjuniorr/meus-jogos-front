module.exports = {
  configureWebpack: {
    resolve: {
      extensions: ['.js', '.vue', '.json'],
      alias: {
        vue$: 'vue/dist/vue.esm.js',
        xlsx: 'xlsx/dist/xlsx.js',
        pdfmakeSp: 'pdfmake/build/pdfmake.min.js',
        vfsfontsSp: 'pdfmake/build/vfs_fonts.js',
      },
    },
  },
  devServer: {
    port: '4200',
    watchOptions: {
      poll: true,
    },
    stats: 'errors-only',
    noInfo: true,
    overlay: {
      warnings: false,
      errors: true,
    },
  },
};
