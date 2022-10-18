import { TodoCard } from "./../../common/components/todos";
import { Browser } from "@copfrontend/cypress-components/dist";

describe("To do", () => {
    beforeEach(() => {
        cy.visit("https://example.cypress.io/todo");
    });
    it("should add a todo", () => {
        cy.get('input[data-test="new-todo"]').type("Laundry{enter}");
        cy.get(".todo-list li").should((items) => {
            expect(items).to.have.length(3);
        });
        cy.get(".todo-list li")
            .last()
            .should((lastItem) => {
                expect(lastItem).to.have.text("Laundry");
            });
    });
    it("should complete a task", () => {
        cy.get(".todo-list li").first().find("input[type=checkbox]").check();
        cy.get(".todo-list li")
            .first()
            .should((item) => {
                expect(item).to.have.class("completed");
            });
        cy.get("footer a").contains("Completed").click();
        cy.get(".todo-list li").should((items) => {
            expect(items).to.have.length(1);
        });
        cy.get(".todo-list li")
            .first()
            .should((firstItem) => {
                expect(firstItem).to.have.text("Pay electric bill");
            });
    });
});

describe("To do", () => {
    beforeEach(() => {
        Browser.visit("https://example.cypress.io/todo");
    });
    it("should add a todo", () => {
        TodoCard.addTodoInput.type("Laundry{enter}");

        TodoCard.items.should((items) => {
            expect(items).to.have.length(3);
        });
        TodoCard.items.last().should((lastItem) => {
            expect(lastItem).to.have.text("Laundry");
        });
    });
    it("should complete a task", () => {
        TodoCard.items.first().find("input[type=checkbox]").check();

        TodoCard.items.first().should((item) => {
            expect(item).to.have.class("completed");
        });

        TodoCard.footer.completedFilterButton.click();

        TodoCard.items.should((items) => {
            expect(items).to.have.length(1);
        });
        TodoCard.items.first().should((firstItem) => {
            expect(firstItem).to.have.text("Pay electric bill");
        });
    });
});
