const { defineConfig } = require("cypress");
const fs = require('fs');
const path = require('path');
const cypressGrep = require('@cypress/grep/src/plugin');



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
  projectId: "1z2vqi",
  env: {
    ...config.env,
    // Thêm biến môi trường cho API testing, lấy từ quy trình CI/CD nếu có
    unsplashAccessKey: process.env.UNSPLASH_ACCESS_KEY || config.env.unsplashAccessKey,
    unsplashSecretKey: process.env.UNSPLASH_SECRET_KEY || config.env.unsplashSecretKey,
  },  e2e: {
    setupNodeEvents(on, config) {
      // Setup Mochawesome reporter
      require('cypress-mochawesome-reporter/plugin')(on);
      
      // Setup Cypress Grep
      cypressGrep(config);
      
      // Add event listener to handle failures better
      on('task', {
        log(message) {
          console.log(message);
          return null;
        },
      });
      
      // Detect CI environment
      config.env.CI = process.env.CI || false;
      
      // Add a better debug capability
      on('before:browser:launch', (browser, launchOptions) => {
        console.log('Launching browser:', browser.name);
        return launchOptions;
      });
      
      // Add before:run event to ensure report directory exists
      on('before:run', () => {
        console.log('Setting up test run and reports directory...');
        const fs = require('fs');
        const path = require('path');
        
        // Create the report directory structure if it doesn't exist
        const reportsPath = path.join(__dirname, 'cypress/reports/html');
        if (!fs.existsSync(reportsPath)) {
          fs.mkdirSync(reportsPath, { recursive: true });
        }
      });
      
      return config;
    },
    
    specPattern: "./cypress/e2e/test/{API,UI}/*",
    baseUrl: config.baseUrl,
    retries: config.retries,
    defaultCommandTimeout: config.defaultCommandTimeout,
    execTimeout: config.execTimeout,
    requestTimeout: config.requestTimeout,
    pageLoadTimeout: config.pageLoadTimeout,    responseTimeout: config.responseTimeout,
    viewportWidth: config.viewportWidth,
    viewportHeight: config.viewportHeight
  },  reporter: 'cypress-mochawesome-reporter',
  reporterOptions: {
    charts: true, //Generates Chart in HTML report
    reportPageTitle: 'Cypress Unsplash Test Report', //Report title will be set to the mentioned string
    embeddedScreenshots: true, //Screenshot will be embedded within the report
    inlineAssets: true, //No separate assets folder will be created
    videoOnFailOnly: false, //If Videos are recorded and added to the report, setting this to true will add the videos only to tests with failures.
    reportDir: 'cypress/reports/html',
    overwrite: false,
    html: false,
    json: true
  }
});
