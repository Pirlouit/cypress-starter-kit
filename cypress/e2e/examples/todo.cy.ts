import { TodoCard } from "./../../common/components/todos";
import { Browser } from "@axa-fr/cypress-component";

describe("To do", () => {
  beforeEach(() => {
    Browser.visit("https://example.cypress.io/todo");
  });
  it("should add a todo", () => {
    TodoCard.addTodoInput.set("Laundry");

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
