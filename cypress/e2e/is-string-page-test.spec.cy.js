import { DELAY_IN_MS } from "../../src/constants/delays";

describe('Тестирование страницы разворота строки:', () => {
  beforeEach(() => {
    cy.visit('/recursion');

    cy.get('form').within(() => {
      cy.get('input[type="text"]').as('input');
      cy.get('button[type="submit"]').as('button');
    });
  });

  it('Проверка недоступности нажатия кнопки при пустом инпуте', () => {
    cy.get('@input').should('have.value', '');
    cy.get('@button').should('be.disabled');
  });

  it('Проверка корректности разворота строки', () => {
    cy.get('@input').type('test');
    cy.get('@input').should('have.value', 'test');
    cy.get('@button').should('not.be.disabled');
    cy.get('@button').click();
    cy.get('@button').children('img').should('have.attr', 'alt', 'Загрузка.');

    cy.get('[class^="circle_circle"]').as('circles');
    cy.get('@circles').eq(0).should('have.css', 'border', '4px solid rgb(210, 82, 225)').contains('t');
    cy.get('@circles').eq(1).should('have.css', 'border', '4px solid rgb(0, 50, 255)').contains('e');
    cy.get('@circles').eq(2).should('have.css', 'border', '4px solid rgb(0, 50, 255)').contains('s');
    cy.get('@circles').eq(3).should('have.css', 'border', '4px solid rgb(210, 82, 225)').contains('t');

    cy.wait(DELAY_IN_MS); // eslint-disable-line
    cy.get('@circles').eq(0).should('have.css', 'border', '4px solid rgb(127, 224, 81)').contains('t');
    cy.get('@circles').eq(1).should('have.css', 'border', '4px solid rgb(210, 82, 225)').contains('e');
    cy.get('@circles').eq(2).should('have.css', 'border', '4px solid rgb(210, 82, 225)').contains('s');
    cy.get('@circles').eq(3).should('have.css', 'border', '4px solid rgb(127, 224, 81)').contains('t');

    cy.wait(DELAY_IN_MS); // eslint-disable-line
    cy.get('@circles').eq(0).should('have.css', 'border', '4px solid rgb(127, 224, 81)').contains('t');
    cy.get('@circles').eq(1).should('have.css', 'border', '4px solid rgb(127, 224, 81)').contains('s');
    cy.get('@circles').eq(2).should('have.css', 'border', '4px solid rgb(127, 224, 81)').contains('e');
    cy.get('@circles').eq(3).should('have.css', 'border', '4px solid rgb(127, 224, 81)').contains('t');
    
    cy.get('@input').should('have.value', '');
    cy.get('@button').should('be.disabled');
  });
});