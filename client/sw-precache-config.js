module.exports = {
    staticFileGlobs: [
      './build/**/**.html',
      './build/images/**.*',
      './build/static/**',
    ],
    swFilePath: './build/service-worker.js',
    navigateFallbackWhitelist: [/^(?!\/__|\/auth\/).*/],
    stripPrefix: 'build/'
  }