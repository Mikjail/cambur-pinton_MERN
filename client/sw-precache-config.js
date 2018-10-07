module.exports = {
    staticFileGlobs:['build' + '/**/*.{js,html,css,png,jpg,gif,svg,eot,ttf,woff}'],
    swFilePath: 'build/service-worker.js',
    navigateFallbackWhitelist: [/^(?!.*\/auth\/google$).*$/],
    stripPrefix: 'build'
  }