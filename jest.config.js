module.exports = {
  testMatch: ['**/*.test.js'],
  name: 'verdaccio-<%= name %>',
  moduleFileExtensions: ['js'],
  transform: {
    '^.+\\.(js)$': 'babel-jest',
  },
  verbose: true,
  collectCoverage: true,
  coveragePathIgnorePatterns: ['node_modules'],
  testEnvironment: 'node',
};
