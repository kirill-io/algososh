import { SHORT_DELAY_IN_MS } from "../../src/constants/delays";

describe('Тестирование страницы удаления и добавления данных в очередь:', () => {
  beforeEach(() => {
    cy.visit('/queue');

    cy.get('form').within(() => {
      cy.get('input[type="text"]').as('input');
      cy.get('button[type="submit"]').as('button');
      cy.get('[data-cy="deleteButton"]').as('deleteButton');
      cy.get('[data-cy="clearButton"]').as('clearButton');
    });

    cy.get('[data-cy="queue"]').as('queue');
  });

  it('Проверка недоступности нажатия кнопки при пустом инпуте', () => {
    cy.get('@input').should('have.value', '');
    cy.get('@button').should('be.disabled');
  });

  it('Проверка корректности добавления элемента в очередь', () => {
    cy.get('@input').type('test');
    cy.get('@button').should('not.be.disabled');
    cy.get('@button').click();
    cy.get('@button').children('img').should('have.attr', 'alt', 'Загрузка.');

    cy.get('@queue').children().eq(0).children('[class^="circle_circle"]').should('have.css', 'border', '4px solid rgb(210, 82, 225)').should('have.value', '');
    cy.wait(SHORT_DELAY_IN_MS); // eslint-disable-line
    cy.get('@queue').children().eq(0).children('[class^="circle_circle"]').should('have.css', 'border', '4px solid rgb(0, 50, 255)').contains('test');
    cy.get('@queue').children().eq(0).first().contains('head');
    cy.get('@queue').children().eq(0).last().contains('tail');

    cy.get('@button').should('be.disabled');
    cy.get('@input').type('test');
    cy.get('@button').should('not.be.disabled');
    cy.get('@button').click();
    cy.get('@button').children('img').should('have.attr', 'alt', 'Загрузка.');

    cy.get('@queue').children().eq(1).children('[class^="circle_circle"]').should('have.css', 'border', '4px solid rgb(210, 82, 225)').should('have.value', '');
    cy.wait(SHORT_DELAY_IN_MS); // eslint-disable-line
    cy.get('@queue').children().eq(1).children('[class^="circle_circle"]').should('have.css', 'border', '4px solid rgb(0, 50, 255)').contains('test');
    cy.get('@queue').children().eq(0).first().contains('head');
    cy.get('@queue').children().eq(1).last().contains('tail');
  });

  it('Проверка корректности удаления элемента из очереди', () => {
    cy.get('@deleteButton').should('be.disabled');
    cy.get('@input').type('test');
    cy.get('@button').should('not.be.disabled');
    cy.get('@button').click();
    cy.get('@button').children('img').should('have.attr', 'alt', 'Загрузка.');
  
    cy.wait(SHORT_DELAY_IN_MS); // eslint-disable-line

    cy.get('@deleteButton').should('not.be.disabled');
    cy.get('@button').should('be.disabled');
    cy.get('@input').type('test');
    cy.get('@button').should('not.be.disabled');
    cy.get('@button').click();
    cy.get('@button').children('img').should('have.attr', 'alt', 'Загрузка.');

    cy.wait(SHORT_DELAY_IN_MS); // eslint-disable-line

    cy.get('@deleteButton').should('not.be.disabled');
    cy.get('@deleteButton').click();
    cy.get('@deleteButton').children('img').should('have.attr', 'alt', 'Загрузка.');

    cy.get('@queue').children().eq(0).first().contains('head');
    cy.get('@queue').children().eq(0).children('[class^="circle_circle"]').should('have.css', 'border', '4px solid rgb(210, 82, 225)').contains('test');
    cy.wait(SHORT_DELAY_IN_MS); // eslint-disable-line
    cy.get('@queue').children().eq(0).first().should('have.value', '');
    cy.get('@queue').children().eq(0).children('[class^="circle_circle"]').should('have.css', 'border', '4px solid rgb(0, 50, 255)').should('have.value', '');
    cy.get('@queue').children().eq(1).children('[class^="circle_circle"]').should('have.css', 'border', '4px solid rgb(0, 50, 255)').contains('test');
    cy.get('@queue').children().eq(1).first().contains('head');
    cy.get('@queue').children().eq(1).last().contains('tail');

    cy.get('@deleteButton').should('not.be.disabled');
    cy.get('@deleteButton').click();
    cy.get('@deleteButton').children('img').should('have.attr', 'alt', 'Загрузка.');

    cy.get('@queue').children().eq(1).first().contains('head');
    cy.get('@queue').children().eq(1).children('[class^="circle_circle"]').should('have.css', 'border', '4px solid rgb(210, 82, 225)').contains('test');
    cy.wait(SHORT_DELAY_IN_MS); // eslint-disable-line
    cy.get('@queue').children().eq(1).first().contains('head');
    cy.get('@queue').children().eq(1).children('[class^="circle_circle"]').should('have.css', 'border', '4px solid rgb(0, 50, 255)').should('have.value', '');
    cy.get('@queue').children().eq(1).last().should('have.value', '');

    cy.get('@deleteButton').should('be.disabled');
  });

  it('Проверка корректности очистки очереди', () => {
    cy.get('@clearButton').should('be.disabled');
    cy.get('@input').type('test');
    cy.get('@button').click();
    cy.get('@clearButton').should('not.be.disabled');

    cy.wait(SHORT_DELAY_IN_MS); // eslint-disable-line

    cy.get('@clearButton').should('not.be.disabled');
    cy.get('@input').type('test');
    cy.get('@button').click();
    cy.get('@clearButton').should('not.be.disabled');

    cy.wait(SHORT_DELAY_IN_MS); // eslint-disable-line

    cy.get('@clearButton').should('not.be.disabled');
    cy.get('@clearButton').click();

    cy.get('[class^="circle_circle"]').should('have.length', 7).each((item) => {
      expect(item).contain('');
    });

    cy.get('@clearButton').should('be.disabled');
  });
});