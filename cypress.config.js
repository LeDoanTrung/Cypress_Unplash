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
      // Cấu hình Mochawesome reporter đúng cách
      const reporterOptions = {
        charts: true, // Tạo biểu đồ trong báo cáo HTML
        reportPageTitle: 'Cypress Unsplash Test Report', // Tiêu đề báo cáo
        embeddedScreenshots: true, // Screenshots được nhúng vào báo cáo
        inlineAssets: true, // Không tạo thư mục assets riêng
        reportDir: 'cypress/reports/html', // Thư mục chứa báo cáo
        overwrite: false, // Không ghi đè các báo cáo cũ
        html: true, // Tạo báo cáo HTML
        json: true, // Tạo báo cáo JSON
        quiet: true, // Tránh log quá nhiều
      };

      // Gọi plugin Mochawesome và truyền tùy chọn
      require('cypress-mochawesome-reporter/plugin')(on, reporterOptions);
      
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
      
      // Tạo thư mục báo cáo trước khi chạy test
      on('before:run', () => {
        console.log('Setting up test run and reports directory...');
        const fs = require('fs');
        const path = require('path');
        
        // Tạo các thư mục báo cáo cần thiết
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
  },  reporter: 'cypress-mochawesome-reporter',
  reporterOptions: {
    charts: true,
    reportPageTitle: 'Cypress Unsplash API Test Report',
    embeddedScreenshots: true,
    inlineAssets: true,
    videoOnFailOnly: false,
    reportDir: 'cypress/reports/html',
    overwrite: false,
    html: true,
    json: true,
    jsonDir: 'cypress/reports/json',
    quiet: true
  }
});
