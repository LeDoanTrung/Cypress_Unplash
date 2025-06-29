# Cypress Cloud Integration

This document explains how to enable Cypress Cloud integration in your GitHub Actions workflow to get access to the Cypress Cloud dashboard and insights for your test runs.

## Why Use Cypress Cloud?

Cypress Cloud (formerly Cypress Dashboard) provides additional features for your test runs:

- View test results, videos, and screenshots in a centralized dashboard
- Parallelize test runs across multiple machines
- Track test history and flaky tests over time
- Debug failing tests with detailed error information
- Share test results with team members

## Setup Steps

### 1. Create a Cypress Cloud Account

If you don't already have one, sign up for a Cypress Cloud account at [https://cloud.cypress.io/](https://cloud.cypress.io/).

### 2. Create a Project in Cypress Cloud

1. Log in to Cypress Cloud
2. Create a new project or select an existing one
3. Note the Project ID (you'll need this for your cypress.config.js)
4. Get your Record Key from the project settings

### 3. Add the Record Key to GitHub Secrets

1. Go to your GitHub repository
2. Navigate to Settings > Secrets and variables > Actions
3. Click "New repository secret"
4. Name: `CYPRESS_RECORD_KEY`
5. Value: (paste the record key from Cypress Cloud)
6. Click "Add secret"

### 4. Verify Project ID in cypress.config.js

Make sure your cypress.config.js file has the correct projectId:

```javascript
module.exports = defineConfig({
  projectId: "YOUR_PROJECT_ID", // Replace with your Cypress Cloud Project ID
  // ...other config options...
});
```

### 5. Update GitHub Actions Workflow

In your GitHub Actions workflow file (.github/workflows/cypress.yml), update the Cypress run step:

```yaml
- name: Run Cypress API tests
  uses: cypress-io/github-action@v6
  continue-on-error: true
  with:
    spec: "cypress/e2e/test/API/{API_Smoke_Test,Simple_API_Test}.cy.js"
    record: true # Enable recording to Cypress Cloud
    config-file: cypress.config.js
  env:
    CYPRESS_RECORD_KEY: ${{ secrets.CYPRESS_RECORD_KEY }}
    GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
```

### 6. Run Your Workflow

Once you've completed these steps, run your GitHub Actions workflow. You should now see a "View in Cypress Cloud" button in the GitHub Actions summary, which will take you to the detailed test results in Cypress Cloud.

## Troubleshooting

- If you don't see the Cypress Cloud button, check that `record: true` is set in your workflow file.
- If tests aren't appearing in Cypress Cloud, verify your record key is correct and properly stored in GitHub Secrets.
- Check that the project ID in cypress.config.js matches the project ID in Cypress Cloud.
