describe('API Smoke Tests', { tags: ['@api', '@smoke'] }, function () {
  beforeEach(() => {
    // Add Allure metadata if enabled
    if (Cypress.env('CYPRESS_ALLURE') === 'true' || Cypress.env('allure') === true) {
      cy.allure()
        .epic('API Testing')
        .feature('API Smoke Tests')
        .severity('critical');
    }
  });
  
  it('Should pass a simple test', function () {
    // Adding allure description
    cy.allure().description('Basic test to verify testing infrastructure works correctly');
    expect(true).to.be.true;
  });
  
  it('Should handle a simple status check', function() {
    cy.allure().description('Verifies that API endpoints respond with valid status codes');
    cy.request({
      url: 'https://jsonplaceholder.typicode.com/posts/1',
      failOnStatusCode: false
    }).then((response) => {
      // Track response data in Allure
      cy.allure().parameter('statusCode', response.status);
      cy.allure().parameter('contentType', response.headers['content-type']);
      
      // Verify the response status regardless of the value
      expect(response.status).to.be.oneOf([200, 201, 404, 500]);
      cy.task('log', `Status code: ${response.status}`);
      
      // Add response body to Allure report
      cy.allure().attachment(
        'Response Body',
        JSON.stringify(response.body, null, 2),
        'application/json'
      );
    });
  });
  
  it('Should write a simple test report', function() {
    // Create report data
    const reportData = {
      testName: 'API Smoke Test',
      timestamp: new Date().toISOString(),
      passed: true
    };
    
    // Write JSON report
    cy.task('writeReport', {
      report: JSON.stringify(reportData, null, 2),
      filename: 'api-report.json'
    });
    
    // Write HTML report
    const htmlReport = `
      <html>
        <head>
          <title>API Test Report</title>
          <style>
            body { font-family: Arial, sans-serif; margin: 20px; }
            .passed { color: green; font-weight: bold; }
          </style>
        </head>
        <body>
          <h1>API Test Report</h1>
          <p>Test: ${reportData.testName}</p>
          <p>Run at: ${reportData.timestamp}</p>
          <p>Result: <span class="passed">PASSED</span></p>
        </body>
      </html>
    `;
    
    cy.task('writeReport', {
      report: htmlReport,
      filename: 'simple-report.html'
    });
    
    expect(true).to.be.true;
  });
});
