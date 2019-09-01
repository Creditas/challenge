const WebpackConfig = require('./webpack.config')

module.exports = (config) => {
  config.set({
    autoWatch: true,
    basePath: '',
    browsers: ['ChromeHeadless', /*'Firefox', 'Edge'*/],
    colors: true,
    concurrency: Infinity,
    exclude: [],
    frameworks: ['jasmine'],
    files: [
      'node_modules/@webcomponents/webcomponentsjs/webcomponents-bundle.js',
      { pattern: 'src/**/*.test.js', type: 'module', included: true },
      { pattern: 'src/**/*.js', type: 'module', included: false }
    ],
    logLevel: config.LOG_INFO,
    port: 9876,
    preprocessors: {
      'src/**/*.test.js': ['webpack']
    },
    reporters: ['spec'],
    singleRun: true,
    webpack: WebpackConfig
  })
}
