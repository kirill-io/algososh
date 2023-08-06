describe('Тестирование переходов по страницам', () => {
  before(() => {
    cy.visit('/');
    cy.wait(1000);
  });

  it('Проверка корректности перехода на страницу recursion', () => {
    cy.visit('/recursion');
    cy.contains('Строка');
    cy.wait(1000);
    cy.visit('/');
    cy.wait(1000);
  });

  it('Проверка корректности перехода на страницу fibonacci', () => {
    cy.visit('/fibonacci');
    cy.contains('Последовательность Фибоначчи');
    cy.wait(1000);
    cy.visit('/');
    cy.wait(1000);
  });

  it('Проверка корректности перехода на страницу sorting', () => {
    cy.visit('/sorting');
    cy.contains('Сортировка массива');
    cy.wait(1000);
    cy.visit('/');
    cy.wait(1000);
  });

  it('Проверка корректности перехода на страницу stack', () => {
    cy.visit('/stack');
    cy.contains('Стек');
    cy.wait(1000);
    cy.visit('/');
    cy.wait(1000);
  });

  it('Проверка корректности перехода на страницу queue', () => {
    cy.visit('/queue');
    cy.contains('Очередь');
    cy.wait(1000);
    cy.visit('/');
    cy.wait(1000);
  });

  it('Проверка корректности перехода на страницу list', () => {
    cy.visit('/list');
    cy.contains('Связный список');
    cy.wait(1000);
    cy.visit('/');
    cy.wait(1000);
  });
});