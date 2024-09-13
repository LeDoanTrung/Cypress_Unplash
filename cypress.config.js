const { defineConfig } = require("cypress");

module.exports = defineConfig({
  env: {
    apiURL: "https://api.unsplash.com",
  },
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
    specPattern: "./cypress/tests/API/*",
    baseUrl: "https://www.demoblaze.com/",
    retries: {
      runMode: 2,
      openMode: 1
    }
  },
  reporter: 'mochawesome',
  defaultCommandTimeout: 10000
});
