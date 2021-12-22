module.exports = {
  presets: [
    [
      '@vue/app',
      {
        useBuiltIns: 'usage' // polyfill按需引入
      }
    ]
  ],
  plugins: [
    '@babel/plugin-transform-runtime',
    [ 'import', {
      libraryName: 'vant',
      libraryDirectory: 'es',
      style: true,
    }, 'vant' ]
  ]
};
