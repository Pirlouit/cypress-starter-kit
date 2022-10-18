afterEach(function () {
    if (this.currentTest!.state !== "failed") {
        cy.screenshot();
    }
});
