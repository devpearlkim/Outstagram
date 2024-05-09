module.exports = {
  // Automatically clear mock calls, instances, contexts and results before every test
  clearMocks: true,

  // Indicates whether the coverage information should be collected while executing the test
  collectCoverage: true,

  // The directory where Jest should output its coverage files
  coverageDirectory: 'coverage',

  // Indicates which provider should be used to instrument code for coverage
  coverageProvider: 'v8',

  moduleNameMapper: {
    '^/@/(.*)$': '<rootDir>/src/$1',
  },

  // Transform file extensions that Jest understands
  transform: {
    '\\.[jt]sx?$': 'babel-jest',
  },

  testEnvironment: 'jest-environment-jsdom',
};
