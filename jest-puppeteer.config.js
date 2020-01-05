const { E2E_DEBUG, E2E_BROWSER = 'chromium', E2E_DOCKER } = process.env;

const debug = E2E_DEBUG === 'true';
const extraLaunchConfig =
  E2E_DOCKER && E2E_BROWSER === 'chromium'
    ? { args: ['--no-sandbox', '--disable-dev-shm-usage'] }
    : {};

module.exports = {
  launch: {
    headless: !debug,
    timeout: 120000,
    slowMo: debug ? 10 : undefined,
    ...extraLaunchConfig,
  },
  browser: E2E_BROWSER,
};
