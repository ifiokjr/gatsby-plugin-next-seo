module.exports = {
  clearMocks: true,
  verbose: true,
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json'],
  globals: {
    __DEV__: true,
    __TEST__: true,
    __E2E__: false,
  },
  transform: {
    '^.+\\.(js|jsx|ts|tsx)$': 'babel-jest',
  },
  testPathIgnorePatterns: ['<rootDir>/lib/', '<rootDir>/node_modules/'],
  testRegex: `.*\\.e2e\\.ts$`,
  modulePathIgnorePatterns: ['node_modules'],
  preset: 'jest-puppeteer',
  watchPlugins: [
    'jest-watch-typeahead/filename',
    'jest-watch-typeahead/testname',
  ],
  setupFilesAfterEnv: ['expect-puppeteer', '<rootDir>/jest.framework.ts'],
  globalSetup: './jest.puppeteer.setup.ts',
  globalTeardown: './jest.puppeteer.teardown.ts',
  snapshotSerializers: ['<rootDir>/html-serializer'],
  testRunner: 'jest-circus/runner',
};
