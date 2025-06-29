# Allure Reporting Integration

This document explains how Allure reporting is integrated with the Cypress tests in this project, providing rich, detailed test reports with screenshots, videos, and detailed test metrics.

## What is Allure?

Allure is an open-source framework designed to create interactive and detailed test reports. It provides:

- Rich visual reports with screenshots and videos
- Detailed test execution data including duration and stack traces
- Test history tracking
- Environment information
- Attachments support

## How Allure is Configured in This Project

The project uses `@shelex/cypress-allure-plugin` to integrate Allure with Cypress. The setup includes:

1. **Package Dependencies**:
   - `@shelex/cypress-allure-plugin`: For integrating Allure with Cypress
   - `allure-commandline`: For generating reports from results

2. **Configuration in cypress.config.js**:
   - The Allure plugin is registered in the `setupNodeEvents` function
   - Environment variable `allure: true` is set when tests are run with Allure

3. **Support File Integration**:
   - The plugin is imported in `cypress/support/e2e.js`
   - Commands for Allure reporting are registered

## Viewing Allure Reports

### In GitHub Actions

When tests are run in GitHub Actions:

1. The Allure results are automatically generated in the `allure-results` directory
2. The Allure report is generated in the `allure-report` directory
3. The report is uploaded as an artifact and can be downloaded from the GitHub Actions run

To view the report:
1. Go to the GitHub Actions tab in your repository
2. Find the relevant workflow run
3. Download the artifacts
4. Open the `index.html` file in the `allure-report` directory

### Locally

To generate and view Allure reports locally:

1. Run Cypress tests with Allure enabled:
   ```bash
   npm run cy:run:allure
   ```

2. Generate the Allure report:
   ```bash
   npm run allure:report
   ```

3. Open the report:
   ```bash
   npm run allure:open
   ```

## Adding Test Annotations

You can enhance your Allure reports by adding annotations to your tests:

```javascript
describe('My Feature', () => {
  it('My Test Case', { tags: '@smoke' }, () => {
    cy.allure().epic('API Testing');
    cy.allure().feature('Authentication');
    cy.allure().story('User Login');
    cy.allure().severity('critical');
    
    // Test steps
    cy.allure().step('Open login page');
    // ... test code
    
    cy.allure().step('Enter credentials');
    // ... test code
    
    // Add attachments
    cy.allure().attachment('Screenshot', 'path/to/screenshot.png', 'image/png');
  });
});
```

## Troubleshooting Common Issues

1. **Empty Reports**:
   - Ensure `CYPRESS_ALLURE=true` is set in your environment
   - Check that the `allure-results` directory is being populated

2. **Missing Screenshots/Videos**:
   - Ensure `screenshotOnRunFailure` is set to `true` in your Cypress config
   - Verify that screenshots and videos are being captured

3. **Report Not Generating**:
   - Check if `allure-commandline` is installed
   - Ensure permissions for writing to the report directories

## CI/CD Pipeline Integration

In our GitHub Actions workflow:

1. The workflow installs necessary Allure dependencies
2. Tests are run with Allure reporting enabled
3. Results are collected and stored in `allure-results`
4. The Allure report is generated and stored in `allure-report`
5. The report is uploaded as an artifact

For more information on GitHub Actions configuration, see the workflow files in `.github/workflows/`.
