# Cypress Starter Kit

[Cypress](https://www.cypress.io) est une alternative à [Selemnium](https://www.selenium.dev/) et permet d'écrire des tests simples rapides et fiables.  
Il a pour but de simplifier la mise en place de tests d'intégration ou end-to-end, qui pouvaient souvent être assez complexes.

Ce répository a pour but de créer des tests d'intégration et de bout en bout sur un projet. Il utilise le package [`cypress-component`](https://github.com/AxaFrance/cypress-component) car il simplifie l'accès aux éléments HTML utlisés au travers de vos fichiers de tests. Il vous permet de naviguer dans l'application de manières plus fonctionelle et de rentrer les données souhaitées exactement comme depuis votre navigateur. Vous pouvez ensuite faire des assertions pour vous assurez que l'application a bien le comportement souhaité.

[[TOC]]

## Pourquoi Cypress ?

Il fonctionne de manière complètement différente des autres outils de test. Cypress s'éxecute directement à l'intèrieur du navigateur contrairement à Selenium qui s’exécute à l'extérieur d'un navigateur et utilise le réseau pour envoyer des commandes à un serveur distant. De plus, il utilise un serveur Node.js qui permet de répondre directement aux évènements de l’application. Il permet également de modifier le trafic réseau et ainsi modifier le contenu de la réponse d’une requête http.

Son installation est extrêmement simple car il s’exécute en local.

## Pré-requis

Pour pouvoir utiliser Cypress vous allez avoir besoin de:

- [NodeJs](https://nodejs.org/en/): <https://nodejs.org/en/download/>
- [NPM](https://nodejs.org/en/): Il devrait logiquement être installé avec NodeJs
- [VS Code](https://code.visualstudio.com): <https://code.visualstudio.com/download> (optionnel)

Guide d'installation: <https://phoenixnap.com/kb/install-node-js-npm-on-windows>

## Installation

- Cloner le repository à l'aide de git dans un nouveau dossier (example: integration-tests)

> 💡 Tips: Créer un dossier au même niveau que votre application. Ne mélangez pas vos tests écrits en Cypress avec vos sources. Il est préférable d'avoir un projet NPM distinct dans un dossier distinct (idéalement au même niveau que votre application).

Example:

```
-Sources/
--client/
---client-app/ <- votre appplication
----src/
----package.json
---integration-tests/ <- votre dossier de tests
--sever/
---...
```

- A la racine éxécuter la commande `npm i`

## Lancement

A la racine éxécuter une des commandes suivantes:

- `npm start`: pour lancer les tests dans l'outils Cypress
- `npm test`: pour lancer les tests en headless
- `npm run cucumber`: pour lancer les tests écrits en Gherkin
- `npm run livedoc`: pour générer la documentation vivante

> 💡 Tips: Si vous voulez exécuter vos tests en local, vous pouvez combiner un script de lancement de votre application et un autre éxécutant Cypress à l'aide du package [`start-server-and-test`](https://github.com/bahmutov/start-server-and-test). Ce package va lancer votre application en locale et attendre que votre server réponde. Pour ensuite lancer l'éxécution de vos tests.

### Exemple

```json
// package.json
    //...
    "scripts": {
        "start": "start-server-and-test app:run 3000 cypress:open",
        "app:run": "cd ../client-app && npm start",
        "cypress:open": "cypress open",
    },
    //...
```

## Documentation

### Cypress component

Cypress-component a pour but de faciliter la lecture et l'écriture de tests Cypress. Il améliore l'accessibilité des éléments du DOM via une approche par composants, comme les frameworks web actuel. Il facilite également la gestion des routes que ce soit dans un environnement bouchonné ou non.

> La documentation: [`cypress-component`](https://github.com/AxaFrance/cypress-component)

La déclaration des composants se fait dans le dossier `cypres/components`.

#### Example de componsants

```ts
// todo.ts

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
```

Cypress-component facilite également la gestion des [routes](https://docs.cypress.io/guides/guides/network-requests). Vous pouvez les définir dans le fichier `cypress/common/routes.ts.`

#### Example de déclaration de routes

```ts
// routes.ts

import {
  HttpMethod,
  RoutesDefinition as RouteDef,
} from "@axa-fr/cypress-component";

export const Routes = {
  profile: "PROFILE",
  // other routes...
};

export const RoutesDefinition: RouteDef = {
  [Routes.profile]: {
    httpMethod: HttpMethod.GET,
    urlPattern: "/api/profile",
    defaultStub: {
      body: {
        sub: "q7NeegECCYxD4J97jzSv7BKsEtv1/YUT2gLbSnbXYfQ=",
        family_name: "PROVIS",
        gender: "unknown",
        given_name: "Pirlouit",
        name: "PROVIS Pirlouit",
        updated_at: 1665581718,
      },
    },
  },
  // other route defintions...
};
```

### Tests Cypress

Dans ce projet vous allez pouvoir écrire des tests en Cypress ou en Gherkin. Les tests Cypress se trouve dans le dossier `cypres/e2e`. Un test écrit en cypress se présente sous la forme `[testName].cy.ts`.

#### Example de test écrit avec cypress-component

> Pour plus d'infos: [`cypress-component`](https://github.com/AxaFrance/cypress-component)

```ts
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
```

> Pour plus de tests consulter le dossier `cypress/e2e/examples`

### Tests en Gherkin

Les tests écrits en Gherkin se trouve dans le dossier `cypres/e2e/features`. Les tests Gherkin se trouve dans un dossier nommé `/[featureName]` avec à l'intèrieur un fichier `[featureName].feature` et l'implémentaions de étapes dans `[featureName].ts`. Vous pouvez également implémenter des étapes partagées entre différentes features dans le dossier `cypress/support/step_definitions`.

Les compatibilité des scénraio Gherkin avec Cypress est assuré par le package [@badeball/cypress-cucumber-preprocessor](https://github.com/badeball/cypress-cucumber-preprocessor)

#### Example de feature et son implémentation

```feature
# todo.feature

Feature: ToDo List

    Scenario: Add a todo
        Given je visite "https://example.cypress.io/todo"
        When j'ajoute un todo appelé "Laundry"
        Then j'otiens bien un nouveau todo dans ma liste: "Laundry"

    Scenario: Complete a task
        Given je visite "https://example.cypress.io/todo"
        When je valide le premier todo de la liste
        Then le premier todo apparait complété
```

```ts
// todo.ts

import { Given, Then, When } from "@badeball/cypress-cucumber-preprocessor";
import { Browser } from "@axa-fr/cypress-component";
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
```

> Pour plus d'infos: [`@badeball/cypress-cucumber-preprocessor`](https://github.com/badeball/cypress-cucumber-preprocessor) et pour plus de features, consultez le dossier `cypress/e2e/features`

### Documentation vivante

Après que vous ayez joué vos test d'intégration via la commande `npm run cucumber`, vous allez pouvoir générer une documentation vivante via la commande `npm run livedoc`. La documentation se trouve dans le dossier `cypress/reports/cucumber-html`.

> 💡 Info: Pour que tout cela soit possible, un json formatter se trouve dans le dossier /reporters (en réalité, il y en a 2: windows et linux). Vous trouverez d'avantages d'inforations [ici](https://github.com/badeball/cypress-cucumber-preprocessor/blob/master/docs/json-report.md)

Le rapport se présente sous la forme suivante:

![Features](./assets/livedoc_1.png)

Où vous retrouvez vos diférentes features. Si vous cliquer sur une feature, vous aurez les scénarios détaillés de cette feature.

<table border="0">
    <thead>
        <th>Example d'un scénario en succès</th>
        <th>Example d'un scénario en échec</th>
    </thead>
    <tr>
        <td><img alt="succeeded feature" src="./assets/livedoc_2.png" /></td>
        <td><img alt="failed feature" src="./assets/livedoc_3.png" /></td>
    </tr>
</table>

## Contribute

- [How to run the solution and to contribute](./CONTRIBUTING.md)
- [Please respect our code of conduct](./CODE_OF_CONDUCT.md)
