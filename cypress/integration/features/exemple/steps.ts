import { Routes, RoutesDefinition } from "../../../common/routes-definitions";
import { RouteHandler } from "@copfrontend/cypress-components/dist";
import { Browser } from "@copfrontend/cypress-components/dist/browser";
import { Given, When } from "cypress-cucumber-preprocessor/steps";
import { Example } from "../../../common/components/example";

Given("je veux xxx", () => {
    RouteHandler.configure(RoutesDefinition);
    RouteHandler.stubDefault();
    Browser.visit("http://localhost:3000");
    RouteHandler.wait(Routes.profile);
    Example.xxx.should((element) => {
        expect(element).to.be.visible;
    });
});
