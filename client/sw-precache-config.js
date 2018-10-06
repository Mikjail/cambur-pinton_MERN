module.exports = {
    staticFileGlobs: [
      'build/static/css/**.css',
      'build/static/js/**.js',
      'build/static/media/**.*'
    ],
    swFilePath: './build/service-worker.js',
    navigateFallbackWhitelist: [/^(?!.*\/auth\/google$).*$/],
    stripPrefix: 'build/'
  }