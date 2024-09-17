const { defineConfig } = require("cypress");
const fs = require('fs');
const path = require('path');
const cypressGrep = require('cypress-grep/src/plugin');


function getConfigByEnvironment(env) {
  const settingsPath = path.resolve(__dirname, `settings/${env}.settings.json`);
  if (fs.existsSync(settingsPath)) {
    return JSON.parse(fs.readFileSync(settingsPath, 'utf8'));
  } else {
    throw new Error(`Settings file for environment "${env}" not found at ${settingsPath}`);
  }
}

const environment = process.env.CYPRESS_ENV || 'qa';
const config = getConfigByEnvironment(environment);

module.exports = defineConfig({
  env: config.env,
  e2e: {
    setupNodeEvents(on, config) {
      cypressGrep(config);
      return config;
    },
    
    specPattern: "./cypress/e2e/test/{API,UI}/*",
    baseUrl: config.baseUrl,
    retries: config.retries,
    defaultCommandTimeout: config.defaultCommandTimeout,
    execTimeout: config.execTimeout,
    requestTimeout: config.requestTimeout,
    pageLoadTimeout: config.pageLoadTimeout,
    responseTimeout: config.responseTimeout,
    viewportWidth: config.viewportWidth,
    viewportHeight: config.viewportHeight
  },
  reporter: 'mochawesome',
});
