import 'jest-extended';

jest.setTimeout(120000);

/* Make unhandledRejection errors easier to debug */
process.on('unhandledRejection', (reason) => {
  console.error('REJECTION', reason);
});
