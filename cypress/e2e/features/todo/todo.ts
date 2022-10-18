import { Given, Then, When } from "@badeball/cypress-cucumber-preprocessor";
import { Browser } from "@axa-fr/cypress-component/dist";
import { TodoCard } from "../../../common/components/todos";

Given("je visite {string}", (url: string) => {
  Browser.visit(url);
});

When("j'ajoute un todo appelé {string}", (todo: string) => {
  TodoCard.addTodoInput.set(todo);
});

When("je valide le premier todo de la liste", () => {
  TodoCard.items.first().find("input[type=checkbox]").check();
});

Then(
  "j'otiens bien un nouveau todo dans ma liste: {string}",
  (todo: string) => {
    TodoCard.items.should((items) => {
      expect(items).to.have.length(3);
    });
    TodoCard.items.last().should((lastItem) => {
      expect(lastItem).to.have.text(todo);
    });
  }
);

Then("le premier todo apparait complété", (todo: string) => {
  TodoCard.items.first().should((item) => {
    expect(item).to.have.class("completed");
  });
});
