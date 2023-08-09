import { SHORT_DELAY_IN_MS } from "../../src/constants/delays";

describe("Тестирование страницы генерации последовательности Фибоначчи:", () => {
  beforeEach(() => {
    cy.visit("/fibonacci");

    cy.get("form").within(() => {
      cy.get('input[type="number"]').as("input");
      cy.get('button[type="submit"]').as("button");
    });
  });

  it("Проверка недоступности нажатия кнопки при пустом инпуте", () => {
    cy.get("@input").should("have.value", "");
    cy.get("@button").should("be.disabled");
  });

  it("Проверка корректности генерации последовательности Фибоначчи", () => {
    cy.get("@input").type("4");
    cy.get("@input").should("have.value", "4");
    cy.get("@button").should("not.be.disabled");
    cy.get("@button").click();
    cy.get("@button").children("img").should("have.attr", "alt", "Загрузка.");

    cy.get('[class^="circle_circle"]').as("circles");
    cy.get("@circles").eq(0).should("have.text", "1");

    cy.wait(SHORT_DELAY_IN_MS); // eslint-disable-line
    cy.get("@circles").eq(0).contains("1");
    cy.get("@circles").eq(1).contains("1");

    cy.wait(SHORT_DELAY_IN_MS); // eslint-disable-line
    cy.get("@circles").eq(0).contains("1");
    cy.get("@circles").eq(1).contains("1");
    cy.get("@circles").eq(2).contains("2");

    cy.wait(SHORT_DELAY_IN_MS); // eslint-disable-line
    cy.get("@circles").eq(0).contains("1");
    cy.get("@circles").eq(1).contains("1");
    cy.get("@circles").eq(2).contains("2");
    cy.get("@circles").eq(3).contains("3");

    cy.wait(SHORT_DELAY_IN_MS); // eslint-disable-line
    cy.get("@circles").eq(0).contains("1");
    cy.get("@circles").eq(1).contains("1");
    cy.get("@circles").eq(2).contains("2");
    cy.get("@circles").eq(3).contains("3");
    cy.get("@circles").eq(4).contains("5");

    cy.get("@input").should("have.value", "");
    cy.get("@button").should("be.disabled");
  });
});
