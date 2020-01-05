module.exports = {
  transform: {
    '.(ts|tsx)': 'babel-jest',
  },
  testRegex: '(/__tests__/.*|\\.(test|spec))\\.(ts|tsx|js|jsx)$',
  moduleFileExtensions: ['ts', 'tsx', 'js'],
  collectCoverageFrom: ['src/**/*.{js,jsx,ts,tsx}'],
  testPathIgnorePatterns: [
    '<rootDir>/.history/',
    '<rootDir>/node_modules/',
    '<rootDir>/cypress/',
    '<rootDir>/e2e/',
    '<rootDir>/example/',
    '<rootDir>/lib/',
  ],
  testEnvironment: 'jsdom',
  testRunner: 'jest-circus/runner',
  watchPlugins: ['jest-watch-typeahead/filename', 'jest-watch-typeahead/testname'],
};
