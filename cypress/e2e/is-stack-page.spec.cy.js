import { SHORT_DELAY_IN_MS } from "../../src/constants/delays";

describe('Тестирование страницы удаления и добавления данных в стек:', () => {
  beforeEach(() => {
    cy.visit('/stack');

    cy.get('form').within(() => {
      cy.get('input[type="text"]').as('input');
      cy.get('button[type="submit"]').as('button');
      cy.get('[data-cy="deleteButton"]').as('deleteButton');
      cy.get('[data-cy="clearButton"]').as('clearButton');
    });

    cy.get('[data-cy="stack"]').as('stack');
  });

  it('Проверка недоступности нажатия кнопки при пустом инпуте', () => {
    cy.get('@input').should('have.value', '');
    cy.get('@button').should('be.disabled');
  });

  it('Проверка корректности добавления элемента в стек', () => {
    cy.get('@input').type('test');
    cy.get('@button').should('not.be.disabled');
    cy.get('@button').click();
    cy.get('@button').children('img').should('have.attr', 'alt', 'Загрузка.');

    cy.get('[class^="circle_circle"]').as('circles');
    cy.get('@circles').eq(0).should('have.css', 'border', '4px solid rgb(210, 82, 225)').contains('test');
    cy.wait(SHORT_DELAY_IN_MS); // eslint-disable-line
    cy.get('@circles').eq(0).should('have.css', 'border', '4px solid rgb(0, 50, 255)').contains('test');

    cy.get('@input').should('have.value', '');
    cy.get('@button').should('be.disabled');
  });

  it('Проверка корректности удаления элемента из стека', () => {
    cy.get('@deleteButton').should('be.disabled');
    cy.get('@input').type('test');
    cy.get('@button').click();
    cy.get('@deleteButton').should('not.be.disabled');
    cy.get('@deleteButton').click();
    cy.get('@deleteButton').children('img').should('have.attr', 'alt', 'Загрузка.');

    cy.get('[class^="circle_circle"]').as('circles');
    cy.get('@circles').eq(0).should('have.css', 'border', '4px solid rgb(210, 82, 225)').contains('test');
    cy.wait(SHORT_DELAY_IN_MS); // eslint-disable-line

    cy.get('@stack').should('have.value', '');
    cy.get('@deleteButton').should('be.disabled');
  });

  it('Проверка корректности очистки стека', () => {
    cy.get('@clearButton').should('be.disabled');
    cy.get('@input').type('test');
    cy.get('@button').click();
    cy.get('@clearButton').should('not.be.disabled');
    cy.get('@clearButton').click();
    cy.get('@stack').should('have.value', '');
    cy.get('@clearButton').should('be.disabled');
  });
});