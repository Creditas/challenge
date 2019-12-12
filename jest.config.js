module.exports = {
  preset: 'react-native',
  verbose: true,
  moduleDirectories: ['node_modules'],
  moduleFileExtensions: ['js', 'json', 'jsx', 'node'],
  setupFiles: ['<rootDir>/jest/setup.js'],
  transform: {
    '^.+\\.js$': '<rootDir>/node_modules/react-native/jest/preprocessor.js',
  },
  transformIgnorePatterns: ['node_modules/(?!(jest-)?react-native)'],
  collectCoverage: true,
};
