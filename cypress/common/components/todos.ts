import { Button, HtmlElement, TextInput } from "@axa-fr/cypress-component";

export const TodoCard = {
  addTodoInput: TextInput('input[data-test="new-todo"]'),
  items: HtmlElement(".todo-list li"),
  footer: {
    completedFilterButton: Button({
      selector: "footer a",
      contains: "Completed",
    }),
  },
};
