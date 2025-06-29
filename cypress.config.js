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
    // Add environment variables for API testing, sourced from CI/CD pipeline if available
    unsplashAccessKey: process.env.UNSPLASH_ACCESS_KEY || config.env.unsplashAccessKey,
    unsplashSecretKey: process.env.UNSPLASH_SECRET_KEY || config.env.unsplashSecretKey,
  },  e2e: {
    setupNodeEvents(on, config) {
      // Use the simpler spec reporter instead of mochawesome
      on('before:run', () => {
        console.log('Setting up test run...');
        
        // Ensure the reports directory exists
        const fs = require('fs');
        const path = require('path');
        const reportsDir = path.join(__dirname, 'cypress/reports');
        
        if (!fs.existsSync(reportsDir)) {
          fs.mkdirSync(reportsDir, { recursive: true });
        }
      });
      
      // Record test results for later use
      on('after:spec', (spec, results) => {
        if (results && results.video) {
          // Path to the video file
          const videoPath = results.video;
          console.log(`Video created at: ${videoPath}`);
        }
        
        // Save test results to a JSON file
        const fs = require('fs');
        const path = require('path');
        const reportPath = path.join(__dirname, 'cypress/reports', `${path.basename(spec.name, '.js')}.json`);
        
        fs.writeFileSync(
          reportPath,
          JSON.stringify(results, null, 2)
        );
      });
      
      // Setup Cypress Grep
      cypressGrep(config);
      
      // Add event listener to handle failures better
      on('task', {
        log(message) {
          console.log(message);
          return null;
        },
        writeReport({ report, filename }) {
          const fs = require('fs');
          const path = require('path');
          const reportPath = path.join(__dirname, 'cypress/reports', filename);
          
          try {
            fs.writeFileSync(reportPath, report);
            return true;
          } catch (e) {
            console.error('Error writing report:', e);
            return false;
          }
        }
      });
      
      // Detect CI environment
      config.env.CI = process.env.CI || false;
      
      // Create report directories before running tests
      on('before:run', () => {
        console.log('Setting up test run and reports directory...');
        const fs = require('fs');
        const path = require('path');
        
        // Create necessary report directories
        const dirs = [
          path.join(__dirname, 'cypress/reports'),
          path.join(__dirname, 'cypress/reports/html'),
          path.join(__dirname, 'cypress/reports/json'),
        ];
        
        dirs.forEach(dir => {
          if (!fs.existsSync(dir)) {
            fs.mkdirSync(dir, { recursive: true });
          }
        });
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
  },  reporter: 'spec',
  video: true,
  screenshotOnRunFailure: true
});
