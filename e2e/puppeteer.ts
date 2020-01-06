/* eslint-disable @typescript-eslint/no-var-requires */
import { Config } from '@jest/types';
import { setup, teardown } from 'jest-dev-server';
import onExit from 'signal-exit';

const { teardown: teardownPuppeteer } = require('jest-environment-puppeteer');
const { setup: setupPuppeteer } = require('jest-environment-puppeteer');

const { EXAMPLE_COMMAND = 'serve' } = process.env;

let serverSetupPromise: Promise<void> | undefined;

export const destroyServer = async (globalConfig?: Config.GlobalConfig) => {
  serverSetupPromise = undefined;
  await teardown();
  await teardownPuppeteer(globalConfig);
};

export const setupServer = async (globalConfig: Config.GlobalConfig) => {
  await setup([
    {
      command: `yarn example:${EXAMPLE_COMMAND}`,
      port: 9000,
      usedPortAction: 'kill',
      launchTimeout: 120000,
    },
  ]);

  onExit(() => {
    destroyServer().then(() => {
      process.exit();
    });
  });

  await setupPuppeteer(globalConfig);
};

export const startServer = (globalConfig: Config.GlobalConfig) => {
  if (serverSetupPromise) {
    return serverSetupPromise;
  } else {
    serverSetupPromise = setupServer(globalConfig);
    return serverSetupPromise;
  }
};
