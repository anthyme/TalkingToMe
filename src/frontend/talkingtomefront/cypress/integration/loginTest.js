describe('Testing the login page', () => {
  it('Enters an username and a password and logins', () => {
    cy.visit('/');
    cy.get('.email').type('test@test.com');
    cy.get('.password').type('monmotdepasse');
    cy.contains('Sign In').click();
    cy.url().should('include', '/Menu');
  });
});
