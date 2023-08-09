import { SHORT_DELAY_IN_MS } from "../../src/constants/delays";

describe("Тестирование страницы удаления и добавления данных в стек:", () => {
  beforeEach(() => {
    cy.visit("/stack");

    cy.get("form").within(() => {
      cy.get('input[type="text"]').as("input");
      cy.get('button[type="submit"]').as("button");
      cy.get('[data-cy="deleteButton"]').as("deleteButton");
      cy.get('[data-cy="clearButton"]').as("clearButton");
    });

    cy.get('[data-cy="stack"]').as("stack");
  });

  it("Проверка недоступности нажатия кнопки при пустом инпуте", () => {
    cy.get("@input").should("have.value", "");
    cy.get("@button").should("be.disabled");
  });

  it("Проверка корректности добавления элемента в стек", () => {
    cy.get("@input").type("test");
    cy.get("@button").should("not.be.disabled");
    cy.get("@button").click();
    cy.get("@button").children("img").should("have.attr", "alt", "Загрузка.");

    cy.get("@stack")
      .children()
      .eq(0)
      .children('[class^="circle_circle"]')
      .should("have.css", "border", "4px solid rgb(210, 82, 225)")
      .contains("test");
    cy.get("@stack").children().eq(0).first().contains("top");
    cy.wait(SHORT_DELAY_IN_MS); // eslint-disable-line
    cy.get("@stack")
      .children()
      .eq(0)
      .children('[class^="circle_circle"]')
      .should("have.css", "border", "4px solid rgb(0, 50, 255)")
      .contains("test");

    cy.get("@input").should("have.value", "");
    cy.get("@button").should("be.disabled");
    cy.get("@input").type("test");
    cy.get("@button").should("not.be.disabled");
    cy.get("@button").click();
    cy.get("@button").children("img").should("have.attr", "alt", "Загрузка.");

    cy.get("@stack")
      .children()
      .eq(1)
      .children('[class^="circle_circle"]')
      .should("have.css", "border", "4px solid rgb(210, 82, 225)")
      .contains("test");
    cy.get("@stack").children().eq(1).first().contains("top");
    cy.wait(SHORT_DELAY_IN_MS); // eslint-disable-line
    cy.get("@stack")
      .children()
      .eq(1)
      .children('[class^="circle_circle"]')
      .should("have.css", "border", "4px solid rgb(0, 50, 255)")
      .contains("test");

    cy.get("@input").should("have.value", "");
    cy.get("@button").should("be.disabled");
  });

  it("Проверка корректности удаления элемента из стека", () => {
    cy.get("@deleteButton").should("be.disabled");
    cy.get("@input").type("test");
    cy.get("@button").should("not.be.disabled");
    cy.get("@button").click();
    cy.get("@button").children("img").should("have.attr", "alt", "Загрузка.");

    cy.wait(SHORT_DELAY_IN_MS); // eslint-disable-line

    cy.get("@deleteButton").should("not.be.disabled");
    cy.get("@button").should("be.disabled");
    cy.get("@input").type("test");
    cy.get("@button").should("not.be.disabled");
    cy.get("@button").click();
    cy.get("@button").children("img").should("have.attr", "alt", "Загрузка.");

    cy.wait(SHORT_DELAY_IN_MS); // eslint-disable-line

    cy.get("@deleteButton").should("not.be.disabled");
    cy.get("@deleteButton").click();
    cy.get("@deleteButton")
      .children("img")
      .should("have.attr", "alt", "Загрузка.");

    cy.get("@stack").children().eq(1).first().contains("top");
    cy.get("@stack")
      .children()
      .eq(1)
      .children('[class^="circle_circle"]')
      .should("have.css", "border", "4px solid rgb(210, 82, 225)")
      .contains("test");
    cy.wait(SHORT_DELAY_IN_MS); // eslint-disable-line

    cy.get("@stack").children().eq(0).first().contains("top");
    cy.get("@stack")
      .children()
      .eq(0)
      .children('[class^="circle_circle"]')
      .should("have.css", "border", "4px solid rgb(0, 50, 255)")
      .contains("test");

    cy.get("@deleteButton").should("not.be.disabled");
    cy.get("@deleteButton").click();
    cy.get("@deleteButton")
      .children("img")
      .should("have.attr", "alt", "Загрузка.");

    cy.get("@stack").children().eq(0).first().contains("top");
    cy.get("@stack")
      .children()
      .eq(0)
      .children('[class^="circle_circle"]')
      .should("have.css", "border", "4px solid rgb(210, 82, 225)")
      .contains("test");
    cy.wait(SHORT_DELAY_IN_MS); // eslint-disable-line

    cy.get("@deleteButton").should("be.disabled");
  });

  it("Проверка корректности очистки стека", () => {
    cy.get("@clearButton").should("be.disabled");
    cy.get("@input").type("test");
    cy.get("@button").click();
    cy.get("@clearButton").should("not.be.disabled");

    cy.wait(SHORT_DELAY_IN_MS); // eslint-disable-line

    cy.get("@clearButton").should("not.be.disabled");
    cy.get("@input").type("test");
    cy.get("@button").click();
    cy.get("@clearButton").should("not.be.disabled");

    cy.wait(SHORT_DELAY_IN_MS); // eslint-disable-line

    cy.get("@clearButton").should("not.be.disabled");
    cy.get("@clearButton").click();

    cy.get("@stack").children().should("have.length", 0);
    cy.get("@clearButton").should("be.disabled");
  });
});
