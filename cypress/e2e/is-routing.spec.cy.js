describe("Тестирование переходов по страницам:", () => {
  before(() => {
    cy.visit("/");
  });

  afterEach(() => {
    cy.visit("/");
  });

  it("Проверка корректности перехода на страницу recursion", () => {
    cy.visit("/recursion");
    cy.url().should("include", "/recursion");
  });

  it("Проверка корректности перехода на страницу fibonacci", () => {
    cy.visit("/fibonacci");
    cy.url().should("include", "/fibonacci");
  });

  it("Проверка корректности перехода на страницу sorting", () => {
    cy.visit("/sorting");
    cy.url().should("include", "/sorting");
  });

  it("Проверка корректности перехода на страницу stack", () => {
    cy.visit("/stack");
    cy.url().should("include", "/stack");
  });

  it("Проверка корректности перехода на страницу queue", () => {
    cy.visit("/queue");
    cy.url().should("include", "/queue");
  });

  it("Проверка корректности перехода на страницу list", () => {
    cy.visit("/list");
    cy.url().should("include", "/list");
  });
});
