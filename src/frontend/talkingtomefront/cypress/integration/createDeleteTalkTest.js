describe('Creating a talk card and deleting it afterwards', () => {
  it('Logins, create a talk and deletes it', () => {
    cy.visit('/');
    cy.get('.email').type('test@test.com');
    cy.get('.password').type('monmotdepasse');
    cy.contains('Sign In').click();
    cy.url().should('include', '/Menu');

    //Menu
    cy.contains('Create new Talk').click();
    cy.get('.talkName').type('This is a test name');
    cy.get('.talkDescription').type('This is the test description');
    cy.contains('Create Talk').click();
    cy.get('.talkPanel').contains('This is a test name');
    cy.get('.talkPanel').children().last().find('.deleteButton').click();
    cy.get('.confirmDelete').click();
  });
});
