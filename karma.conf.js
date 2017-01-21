module.exports = (config) => {
  config.set({
    basePath: '',

    frameworks: ['jasmine'],

    files: [
        'specs/spec.bundle.js',
        { pattern: 'specs/{**,*,**/*, **/**}.js', watched: false }
    ],

    webpack: require('./webpack.config-test.js'),
    
    webpackServer: {
      noInfo: true
    },

    exclude: [
    ],

    preprocessors: {
        'specs/{**,*,**/*}.js': ['webpack']
    },

    reporters: ['progress'],

    port: 9876,

    colors: true,

    autoWatch: true,

    logLevel: config.LOG_INFO,

    browsers: ['PhantomJS'],

    singleRun: false,

    concurrency: Infinity
  });
}
