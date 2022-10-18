Feature: ToDo List

    Scenario: Add a todo
        Given je visite "https://example.cypress.io/todo"
        When j'ajoute un todo appelé "Laundry"
        Then j'otiens bien un nouveau todo dans ma liste: "Laundry"

    Scenario: Complete a task
        Given je visite "https://example.cypress.io/todo"
        When je valide le premier todo de la liste
        Then le premier todo apparait complété