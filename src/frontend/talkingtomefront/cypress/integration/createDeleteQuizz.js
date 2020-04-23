describe('Creating a Quizz card and deleting it afterwards', () => {
    it('Logins, create a Quizz and deletes it', () => {
      cy.visit('/');
      cy.get('.email').type('test@test.com');
      cy.get('.password').type('monmotdepasse');
      cy.contains('Sign In').click();
      cy.url().should('include', '/Menu');
  
      //Menu
      cy.contains('Create new Quizz').click();
      cy.get('.quizzName').type('This is a test Quizz');
      cy.get('.questionsPanel').children().first().find('.questionText').type("Is this a question?");
      cy.get('.answersPanel').children().first().find('.answerText').type("yes, it is");
      cy.get('.answersPanel').children().get('.answerText').eq(1).type("no, it is not");
      cy.get('.answersPanel').children().get('.formControlLabel').eq(0).click();
      cy.get('.questionsPanel').contains("Add Answer").click();
      cy.get('.questionsPanel').contains("Add Answer").click();
      cy.get('.questionsPanel').children().get('.answerText').eq(3).type("Sorry I messed up");
      cy.get('.answersPanel').children().get('.deleteAnswer').eq(2).click();
      cy.get('.answersPanel').children().get('.deleteAnswer').eq(2).click();
      cy.contains('Validate Quizz').click();
      cy.contains('Quizzes').click();
      cy.get('.quizzPanel').children().last().find('.deleteButton').click();
      cy.get('.confirmDelete').click();
    });
  });
  