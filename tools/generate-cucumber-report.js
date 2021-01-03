const path = require('path');
const reporter = require('cucumber-html-reporter');
const chalk = require('chalk');

const options = {
  theme: 'bootstrap',
  jsonDir: path.join(process.cwd(), 'cyreport/cucumber-json'),
  output: path.join(process.cwd(), 'cyreport/cucumber_report.html'),
  reportSuiteAsScenarios: true,
  scenarioTimestamp: true,
  launchReport: false,
  storeScreenshots: true,
  noInlineScreenshots: false,
};

try {
  reporter.generate(options);
} catch (e) {
  console.log(chalk.red(`Could not generate cypress reports`));
  console.log(chalk.red(`${e}`));
}
