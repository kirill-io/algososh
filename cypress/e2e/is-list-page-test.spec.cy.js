import { CIRCLES } from "../constants";
import { SHORT_DELAY_IN_MS } from "../../src/constants/delays";

describe("Тестирование страницы связанный список:", () => {
  beforeEach(() => {
    cy.visit("/list");

    cy.get("form").within(() => {
      cy.get('[data-cy="inputValue"]').as("inputValue");
      cy.get('[data-cy="inputIndex"]').as("inputIndex");
      cy.get('[data-cy="addHeadButton"]').as("addHeadButton");
      cy.get('[data-cy="addTailButton"]').as("addTailButton");
      cy.get('[data-cy="deleteHeadButton"]').as("deleteHeadButton");
      cy.get('[data-cy="deleteTailButton"]').as("deleteTailButton");
      cy.get('[data-cy="addToIndexButton"]').as("addToIndexButton");
      cy.get('[data-cy="deleteToIndexButton"]').as("deleteToIndexButton");
    });

    cy.get('[data-cy="list"]').as("list");
  });

  it("Проверка недоступности кнопок при пустом инпуте", () => {
    cy.get("@inputValue").should("have.value", "");
    cy.get("@addHeadButton").should("be.disabled");
    cy.get("@addTailButton").should("be.disabled");
    cy.get("@addToIndexButton").should("be.disabled");
    cy.get("@deleteToIndexButton").should("be.disabled");
  });

  it("Проверка корректности отрисовки дефолтного списка", () => {
    cy.get("@list").should("not.be.empty");
  });

  it("Проверка корректности добавления элемента в head", () => {
    cy.get("@inputValue").type("test");
    cy.get("@addHeadButton").should("not.be.disabled");
    cy.get("@addHeadButton").click();
    cy.get("@addHeadButton")
      .children("img")
      .should("have.attr", "alt", "Загрузка.");

    cy.get(CIRCLES)
      .filter(':contains("test")')
      .should("have.css", "border", "4px solid rgb(210, 82, 225)");
    cy.wait(SHORT_DELAY_IN_MS); // eslint-disable-line
    cy.get(CIRCLES)
      .filter(':contains("test")')
      .should("have.css", "border", "4px solid rgb(127, 224, 81)");
    cy.wait(SHORT_DELAY_IN_MS); // eslint-disable-line
    cy.get(CIRCLES)
      .filter(':contains("test")')
      .should("have.css", "border", "4px solid rgb(0, 50, 255)");

    cy.get("@inputValue").should("have.value", "");
    cy.get("@addHeadButton").should("be.disabled");
  });

  it("Проверка корректности добавления элемента в tail", () => {
    cy.get("@inputValue").type("test");
    cy.get("@addTailButton").should("not.be.disabled");
    cy.get("@addTailButton").click();
    cy.get("@addTailButton")
      .children("img")
      .should("have.attr", "alt", "Загрузка.");

    cy.get(CIRCLES)
      .filter(':contains("test")')
      .should("have.css", "border", "4px solid rgb(210, 82, 225)");
    cy.wait(SHORT_DELAY_IN_MS); // eslint-disable-line
    cy.get(CIRCLES)
      .filter(':contains("test")')
      .should("have.css", "border", "4px solid rgb(127, 224, 81)");
    cy.wait(SHORT_DELAY_IN_MS); // eslint-disable-line
    cy.get(CIRCLES)
      .filter(':contains("test")')
      .should("have.css", "border", "4px solid rgb(0, 50, 255)");

    cy.get("@inputValue").should("have.value", "");
    cy.get("@addTailButton").should("be.disabled");
  });

  it("Проверка корректности добавление элемента по индексу", () => {
    cy.get("@inputValue").type("test");
    cy.get("@inputIndex").type("2");
    cy.get("@addToIndexButton").should("not.be.disabled");
    cy.get("@addToIndexButton").click();
    cy.get("@addToIndexButton")
      .children("img")
      .should("have.attr", "alt", "Загрузка.");

    cy.get(CIRCLES)
      .filter(':contains("test")')
      .should("have.css", "border", "4px solid rgb(210, 82, 225)");
    cy.wait(SHORT_DELAY_IN_MS); // eslint-disable-line
    cy.get(CIRCLES)
      .eq(0)
      .should("have.css", "border", "4px solid rgb(210, 82, 225)");
    cy.wait(SHORT_DELAY_IN_MS); // eslint-disable-line
    cy.get(CIRCLES)
      .eq(1)
      .should("have.css", "border", "4px solid rgb(210, 82, 225)");
    cy.wait(SHORT_DELAY_IN_MS); // eslint-disable-line
    cy.get(CIRCLES)
      .eq(2)
      .should("have.css", "border", "4px solid rgb(127, 224, 81)")
      .contains("test");
    cy.wait(SHORT_DELAY_IN_MS); // eslint-disable-line
    cy.get(CIRCLES)
      .eq(2)
      .should("have.css", "border", "4px solid rgb(0, 50, 255)")
      .contains("test");

    cy.get("@inputValue").should("have.value", "");
    cy.get("@inputIndex").should("have.value", "");
    cy.get("@addToIndexButton").should("be.disabled");
  });

  it("Проверка корректности удаления элемента из head", () => {
    cy.get("@deleteHeadButton").should("not.be.disabled");
    cy.get("@deleteHeadButton").click();
    cy.get("@deleteHeadButton")
      .children("img")
      .should("have.attr", "alt", "Загрузка.");

    cy.get(CIRCLES).first().should("have.text", "");
    cy.get(CIRCLES)
      .eq(1)
      .should("have.css", "border", "4px solid rgb(210, 82, 225)");
    cy.wait(SHORT_DELAY_IN_MS); // eslint-disable-line
    cy.get(CIRCLES).first().should("not.be.empty");

    cy.get("@deleteHeadButton").should("not.be.disabled");
  });

  it("Проверка корректности удаления элемента из tail", () => {
    cy.get("@deleteTailButton").should("not.be.disabled");
    cy.get("@deleteTailButton").click();
    cy.get("@deleteTailButton")
      .children("img")
      .should("have.attr", "alt", "Загрузка.");

    cy.get(CIRCLES)
      .last()
      .should("have.css", "border", "4px solid rgb(210, 82, 225)");
    cy.get(CIRCLES).eq(-2).should("have.text", "");
    cy.wait(SHORT_DELAY_IN_MS); // eslint-disable-line
    cy.get(CIRCLES).last().should("not.be.empty");

    cy.get("@deleteTailButton").should("not.be.disabled");
  });

  it("Проверка корректности удаления элемента по индексу", () => {
    cy.get("@inputIndex").type("2");
    cy.get("@deleteToIndexButton").should("not.be.disabled");
    cy.get("@deleteToIndexButton").click();
    cy.get("@deleteToIndexButton")
      .children("img")
      .should("have.attr", "alt", "Загрузка.");

    cy.get(CIRCLES)
      .eq(0)
      .should("have.css", "border", "4px solid rgb(210, 82, 225)");
    cy.wait(SHORT_DELAY_IN_MS); // eslint-disable-line
    cy.get(CIRCLES)
      .eq(1)
      .should("have.css", "border", "4px solid rgb(210, 82, 225)");
    cy.wait(SHORT_DELAY_IN_MS); // eslint-disable-line
    cy.get(CIRCLES)
      .eq(2)
      .should("have.css", "border", "4px solid rgb(210, 82, 225)");
    cy.wait(SHORT_DELAY_IN_MS); // eslint-disable-line
    cy.get(CIRCLES)
      .eq(2)
      .should("have.css", "border", "4px solid rgb(0, 50, 255)")
      .should("have.text", "");
    cy.get(CIRCLES)
      .eq(3)
      .should("have.css", "border", "4px solid rgb(210, 82, 225)")
      .should("not.be.empty");
    cy.wait(SHORT_DELAY_IN_MS); // eslint-disable-line
    cy.get(CIRCLES)
      .last()
      .should("have.css", "border", "4px solid rgb(0, 50, 255)")
      .should("not.be.empty");

    cy.get("@deleteToIndexButton").should("be.disabled");
  });
});
