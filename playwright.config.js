/**
 * Configuration for Playwright using default from @jupyterlab/galata
 */
const baseConfig = require('@jupyterlab/galata/lib/playwright-config');

module.exports = {
  ...baseConfig,
  webServer: {
    command: 'npm run start:test',
    url: 'http://localhost:8888/lab',
    timeout: 120 * 1000,
    reuseExistingServer: false,
    gracefulShutdown: {
      signal: 'SIGTERM', timeout: 500 
    }
  },
  retries: 2,
  use: {
    ...baseConfig.use,
    trace: 'off',
    video: 'retain-on-failure'
  },
  expect: {
    toMatchSnapshot: {
      maxDiffPixelRatio: 0.02,
    },
  },
};
