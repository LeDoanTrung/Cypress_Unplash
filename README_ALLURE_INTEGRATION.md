# Allure Report Integration for Cypress Tests

This guide covers the changes made to integrate Allure Reports into the Cypress API testing workflow.

## What is Allure?

Allure is a flexible, lightweight multi-language test reporting tool that not only shows a very concise representation of what has been tested but makes test reports clear to everyone in the team. It provides:

- Beautiful HTML reports with rich details
- History trends of test executions
- Categorization of failures
- Integration with CI/CD systems

## Changes Made

1. **Dependencies Added**:
   - `@shelex/cypress-allure-plugin`: Main plugin for integrating Allure with Cypress
   - `allure-commandline`: Command-line tool to generate reports
   - `mocha-junit-reporter`: JUnit XML reporter for better CI integration

2. **Configuration Updates**:
   - Added Allure plugin to `cypress.config.js`
   - Registered Allure commands in `cypress/support/e2e.js`
   - Updated GitHub Actions workflow to generate and publish Allure reports

3. **GitHub Actions Workflow Changes**:
   - Fixed the "record key" error by disabling the `record` flag
   - Added step to install Allure dependencies
   - Added configuration to generate JUnit XML reports
   - Set up Allure report generation
   - Included Allure reports in artifacts

## How to Run Tests with Allure Locally

1. Install the dependencies:
   ```bash
   npm install -D @shelex/cypress-allure-plugin allure-commandline mocha-junit-reporter
   ```

2. Run tests with Allure reporting enabled:
   ```bash
   npx cypress run --env ALLURE=true
   ```

3. Generate and open the report:
   ```bash
   npx allure generate allure-results --clean -o allure-report && npx allure open allure-report
   ```

## Viewing Reports in GitHub Actions

After a workflow run completes:

1. Go to the Actions tab in your GitHub repository
2. Select the completed workflow run
3. In the Artifacts section, download the "cypress-test-results-*" artifact
4. Extract the downloaded zip file
5. Open the `allure-report/index.html` file in your browser

## Benefits of Allure Reports

- **Rich, Interactive UI**: Clearer presentation of test results compared to plain HTML or Mochawesome
- **Categorization**: Tests are organized by features, stories, and severity
- **History**: Track test stability over time
- **Attachments**: Screenshots and videos are neatly embedded in the report
- **Analytics**: Get insights into test execution patterns and failure trends

## Next Steps

Consider adding more details to your tests by using Allure annotations:

```javascript
it('should validate API response', { tags: ['@api'] }, function() {
  cy.allure().epic('API Tests').feature('User API').story('Get User Profile');
  cy.allure().severity('critical');
  
  // Your test code here
  
  cy.allure().step('Verify user data is correct');
  expect(user.name).to.equal('Expected Name');
});
```

This will enhance your reports with more structure and organization.
