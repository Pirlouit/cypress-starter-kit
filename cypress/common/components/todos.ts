import { Button, HtmlElement } from "@copfrontend/cypress-components";
import { TextInput } from "@copfrontend/cypress-components/dist";

export const TodoCard = {
    addTodoInput: TextInput('input[data-test="new-todo"]'),
    items: HtmlElement(".todo-list li"),
    footer: {
        completedFilterButton: Button({ selector: "footer a", contains: "Completed" }),
    },
};
