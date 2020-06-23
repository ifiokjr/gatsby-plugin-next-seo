import 'jest-extended';

jest.setTimeout(120000);

/* Make unhandledRejection errors easier to debug */
process.on('unhandledRejection', (reason) => {
  console.error('REJECTION', reason);
});

// Needed for gatsby develop since the first request always timesout.
jest.retryTimes(2);
