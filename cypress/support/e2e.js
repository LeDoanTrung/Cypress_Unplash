// ***********************************************************
// This example support/e2e.js is processed and
// loaded automatically before your test files.
//
// This is a great place to put global configuration and
// behavior that modifies Cypress.
//
// You can change the location of this file or turn off
// automatically serving support files with the
// 'supportFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/configuration
// ***********************************************************

// Import commands.js using ES2015 syntax:
import './api.commands';
import './element.command';
import '@cypress/grep';
require('cypress-xpath');

// Import and register Allure reporter plugin 
import '@shelex/cypress-allure-plugin';

// Hook that runs before each test
before(function() {
  cy.log('Starting test execution');
  
  // Register Allure test case reporting if enabled
  if (Cypress.env('CYPRESS_ALLURE') === 'true' || Cypress.env('allure') === true) {
    cy.allure().feature(Cypress.currentTest.titlePath[0]);
    cy.allure().story(Cypress.currentTest.titlePath[1]);
  }
});

// Record test results after test completion
after(function() {
  // Get results from Mocha test runner with better reliability
  const testResults = {
    passed: this.currentTest?.state === 'passed',
    title: this.currentTest?.title,
    // More reliable way to count tests
    testCount: Cypress._.filter(
      Cypress.mocha.getRunner().suite.eachTest(t => t),
      { type: 'test' }
    ).length,
    timestamp: new Date().toISOString()
  };

  // Create a simple report
  const reportContent = `
    <!DOCTYPE html>
    <html>
    <head>
      <title>API Test Report</title>
      <style>
        body { font-family: Arial, sans-serif; margin: 20px; }
        .pass { color: green; }
        .fail { color: red; }
      </style>
    </head>
    <body>
      <h1>API Test Report</h1>
      <p>Timestamp: ${testResults.timestamp}</p>
      <p>Test result: <span class="${testResults.passed ? 'pass' : 'fail'}">${testResults.passed ? 'PASSED' : 'FAILED'}</span></p>
    </body>
    </html>
  `;

  // Save report using custom task
  cy.task('writeReport', { 
    report: reportContent,
    filename: 'simple-report.html'
  });
});

// Alternatively you can use CommonJS syntax:
// require('./commands')

Cypress.on('uncaught:exception', (err, runnable) => {
    // returning false here prevents Cypress from
    // failing the test
    return false
})