const multipleCucumberHtmlReporter = require("multiple-cucumber-html-reporter");
const { join } = require("path");
const CUSTOM_STYLE_PATH = "cucumber-html-report.css";

multipleCucumberHtmlReporter.generate({
  jsonDir: "cypress/reports", // ** Path of .json files **//
  reportPath: "cypress/reports/cucumber-html", // ** Path of .html file **//
  pageTitle: "My Features", // ** Name of HTML page **//
  staticFilePath: true,
  hideMetadata: true,
  customStyle: join(__dirname, CUSTOM_STYLE_PATH),
});
