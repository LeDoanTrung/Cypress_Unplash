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

// Hook chạy trước mỗi test
before(function() {
  cy.log('Starting test execution');
});

// Ghi lại kết quả test sau khi test hoàn thành
after(function() {
  // Lấy kết quả từ Mocha test runner
  const testResults = {
    passed: this.currentTest?.state === 'passed',
    title: this.currentTest?.title,
    testCount: Cypress.mocha.getRunner().suite.suites[0]?._beforeAll.length || 0,
    timestamp: new Date().toISOString()
  };

  // Tạo báo cáo đơn giản
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

  // Lưu báo cáo bằng task
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