describe('Тестирование работоспособности приложения:', () => {
  it('Приложение доступно на localhost:3000', () => {
    cy.visit('/');
    cy.url().should('include', 'http://localhost:3000/');
  });
});