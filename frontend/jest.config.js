module.exports = {
  browser: true,
  verbose: true,
  clearMocks: true,
  collectCoverage: true,
  testEnvironment: 'jest-environment-jsdom',
  coverageThreshold: {
    global: {
      branches: 80,
      functions: 80,
      lines: 80,
      statements: -10
    }
  },
  testMatch: [
    '**/__tests__/**/*.js?(x)',
    '**/?(*.)+(spec|test).js?(x)'
  ],
  coveragePathIgnorePatterns: [
    '/node_modules/'
  ],
  collectCoverageFrom: [
    'src/**/*.{js,jsx}'
  ],
  testPathIgnorePatterns: [
    '/node_modules/'
  ],
  transformIgnorePatterns: [
    '/node_modules/'
  ],
  setupFilesAfterEnv: [
    '<rootDir>/node_modules/regenerator-runtime/runtime',
    '<rootDir>/config/setupTest.js'
  ],
  transform: {
    '.+\\.js$': 'babel-jest',
    '^.+\\.html?$': 'html-loader-jest'
  },
  moduleNameMapper: {
    '\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$': '<rootDir>/__mocks__/fileMock.js',
    '\\.(css|scss)$': '<rootDir>/__mocks__/styleMock.js'
  }
}
