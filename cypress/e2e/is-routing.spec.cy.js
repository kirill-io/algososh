describe('Тестирование переходов по страницам', () => {
  before(() => {
    cy.visit('http://localhost:3000/');
    cy.wait(1000);
  });

  it('Проверка корректности перехода на страницу recursion', () => {
    cy.visit('http://localhost:3000/recursion');
    cy.contains('Строка');
    cy.wait(1000);
    cy.visit('http://localhost:3000/');
    cy.wait(1000);
  });

  it('Проверка корректности перехода на страницу fibonacci', () => {
    cy.visit('http://localhost:3000/fibonacci');
    cy.contains('Последовательность Фибоначчи');
    cy.wait(1000);
    cy.visit('http://localhost:3000/');
    cy.wait(1000);
  });

  it('Проверка корректности перехода на страницу sorting', () => {
    cy.visit('http://localhost:3000/sorting');
    cy.contains('Сортировка массива');
    cy.wait(1000);
    cy.visit('http://localhost:3000/');
    cy.wait(1000);
  });

  it('Проверка корректности перехода на страницу stack', () => {
    cy.visit('http://localhost:3000/stack');
    cy.contains('Стек');
    cy.wait(1000);
    cy.visit('http://localhost:3000/');
    cy.wait(1000);
  });

  it('Проверка корректности перехода на страницу queue', () => {
    cy.visit('http://localhost:3000/queue');
    cy.contains('Очередь');
    cy.wait(1000);
    cy.visit('http://localhost:3000/');
    cy.wait(1000);
  });

  it('Проверка корректности перехода на страницу list', () => {
    cy.visit('http://localhost:3000/list');
    cy.contains('Связный список');
    cy.wait(1000);
    cy.visit('http://localhost:3000/');
    cy.wait(1000);
  });
});