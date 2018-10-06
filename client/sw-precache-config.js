module.exports = {
    staticFileGlobs: [
      './build/**/**.html',
      './build/images/**.*',
      './static/**',
    ],
    swFilePath: './build/service-worker.js',
    navigateFallbackWhitelist: [/^(?!.*\/auth\/google$).*$/],
    stripPrefix: 'build/'
  }