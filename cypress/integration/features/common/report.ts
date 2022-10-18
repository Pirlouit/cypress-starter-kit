import { addScreenshotToReport } from "@copfrontend/cypress-cucumber-html-report/bin/cucumber-screenshot";
import { After } from "cypress-cucumber-preprocessor/steps";

After(() => {
    addScreenshotToReport();
});
