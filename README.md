# Cypress Framework for Unsplash

[![cypress-framework](https://img.shields.io/endpoint?url=https://cloud.cypress.io/badge/detailed/sh3aqa/main&style=flat&logo=cypress)](https://cloud.cypress.io/projects/sh3aqa/runs)
[![cypress-framework](https://img.shields.io/endpoint?url=https://cloud.cypress.io/badge/count/sh3aqa/main&style=flat&logo=cypress)](https://cloud.cypress.io/projects/sh3aqa/runs)

Cypress test automation framework built with JavaScript (JS) that follows the Page Object Model (POM) design pattern to implement the UI tests for OpenCart E-commerce store.

> If you are a beginner to Cypress, refer to my other repo to refresh your Cypress knowledge which will serve as a starting-point to Cypress testing:
[Cypress-E2E-Web-and-API-Testing](https://github.com/itkhanz/Cypress-E2E-Web-and-API-Testing)

Application Under Test (AUT):
https://naveenautomationlabs.com/opencart/index.php


## Description
This project is a Cypress framework designed for testing the Unsplash application. It includes various services and utilities to facilitate API testing and UI testing.

## Features 💡

* Atomic and Independent test cases
* Robust Locator strategies to target elements
* No hard coded strings and test data in spec files
* Hooks to perform the repeated steps for all the tests inside spec
* Loading test data from external fixtures files i.e. JSON
* Generate random test data with faker library
* Loading environment specific configuration and environment variables per environment i.e. dev, stage, prod
* Ability to filter and run tests with specific tags i.e. regression, smoke
* Pass browser and mode as environment variable
* Configure routes (URL endpoints) in a constant config file
* Usage of OOP Inheritance to extend all the pages from BasePage
  * Allows to load header and footer components from BasePage constructor
  * Call the `cy.visit()` from BasePage with specified path
* Test Retries for failing tests
* Custom commands for login and validation in `cypress/support/commands.js`
* Intellisense for custom commands in `cypress/support/index.d.ts`
* Reusable test utilities functions inside `cypress/e2e/utils` 
* Support for Cypress Cloud (Dashboard)
* Multiple reporters configuration (JUnit XML, cpress-mochawesome-reporter HTML) 
* Cypress with Docker using Dockerfile and docker-compose
* Continuous Integration CI with Jenkins 


## Setup 🛠️

### Pre-requisites

* Install NodeJS and NPM pakcage manager.
* Code Editor of your choice e.g. Visual Studio Code
  * Install [ESLint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint) VS Code extension from Microsoft to make linting work in IDE
* GIT Client (for remote tracking)
* GIT Bash terminal (for Windows)

#### Optional
* Install [Cypress Snippets](https://marketplace.visualstudio.com/items?itemName=CliffSu.cypress-snippets) VS Code Extension that includes the most common cypress snippets.

### Setup from Scratch

* `npm init` to setup node project with package.json
* `npm install --save-dev cypress` to install cypress as dev dependency
* `npx cypress open` to open the cypress test runner and choose `E2E Testing` which will create cypress config, support and fixture folders.
* Choose browser of your choice, and scaffold examples which will create boilerplate specs within e2e folder.
* Remove the default boilerplate specs from `cypress/e2e` folder
* Add `.gitignore` to exclude files and folders from GIT
* Add `README.md` to document
* Start with writing tests under `cypress/e2e` directory.


## Installation
To set up the project, follow these steps:

1. Clone the repository:
    ```bash
    git clone https://github.com/your-repo/cypress-framework-unsplash.git
    ```
2. Navigate to the project directory:
    ```bash
    cd cypress-framework-unsplash
    ```
3. Install the dependencies:
    ```bash
    npm install
    ```

## Usage
To run the tests, use the following commands:

- Run all tests:
    ```bash
    npx cypress run
    ```
- Open Cypress Test Runner:
    ```bash
    npm run open
    ```

### Environment-Specific Tests
- Run tests in QA environment:
    ```bash
    npm run test:qa
    ```
- Run tests in Staging environment:
    ```bash
    npm run test:staging
    ```
- Run tests in Production environment:
    ```bash
    npm run test:prod
    ```

### Reporting
- Run tests with Mocha reporter:
    ```bash
    npm run test:mocha-reporter
    ```
- Merge Mocha reports:
    ```bash
    npm run merge-reports
    ```
- Build Mocha report:
    ```bash
    npm run build-report
    ```
- Open Mocha report:
    ```bash
    npm run open-report
    ```
- Clean Mocha report:
    ```bash
    npm run clean-report
    ```
- Clean results:
    ```bash
    npm run clean-results
    ```
- Full report generation workflow:
    ```bash
    npm run report
    ```

### Parallel Testing
- Run tests in parallel:
    ```bash
    npm run test-parallel
    ```

### Tag-Specific Tests
- Run API tests:
    ```bash
    npm run test:api
    ```
- Run UI tests:
    ```bash
    npm run test:ui
    ```
- Run Regression tests:
    ```bash
    npm run test:regression
    ```
- Run Smoke tests:
    ```bash
    npm run test:smoke
    ```
- Run Happy Case tests:
    ```bash
    npm run test:happyCase
    ```

## Project Structure
- `cypress/fixtures`: Contains test data files.
- `cypress/e2e/test`: Contains test cases.
- `cypress/e2e/page`: Contains page object.
- `cypress/support`: Contains custom commands and utilities.
- `cypress/service`: Contains service classes for API interactions.
- `cypress/constant`: Contains constant values used across the project, such as API endpoints and configuration settings.

## Jenkins Integration
This project includes a `Jenkinsfile` for setting up a Jenkins pipeline. The `Jenkinsfile` is located in the root directory of the project and defines the stages for installing dependencies, running tests, and generating reports.

To set up the Jenkins pipeline:
1. Create a new pipeline job in Jenkins.
2. In the pipeline configuration, point to the repository containing this project.
3. Jenkins will automatically detect the `Jenkinsfile` and use it to configure the pipeline.

## Contributing
To contribute to this project, follow these steps:

1. Fork the repository.
2. Create a new branch:
    ```bash
    git checkout -b feature-branch
    ```
3. Make your changes and commit them:
    ```bash
    git commit -m "Description of changes"
    ```
4. Push to the branch:
    ```bash
    git push origin feature-branch
    ```
5. Create a pull request.

## License
This project is licensed under the MIT License. See the LICENSE file for details.