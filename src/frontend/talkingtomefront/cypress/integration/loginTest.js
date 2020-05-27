import { cypEmail, cypMdp } from '../cypressLogins';

let user;

before(function fetchUser() {
  cy.request({
    // cy.request is not bound by any security and will bypass the login part
    method: 'POST', // Post request to URL along with body
    url: 'https://accounts.google.com/',
    body: {
      user: {
        email: cypEmail,
        password: cypMdp,
      },
    },
  })
    //server sends back the response JSON payload
    .then((resp) => {
      //token extracted from JSON payload and is saved in LocalStorage
      user = resp;
      console.log('Louis resp', resp);
    });
});

beforeEach(function setUser() {
  cy.visit('http://localhost:3000/', {
    onBeforeLoad(win) {
      // and before the page finishes loading
      // set the user object in local storage
      win.localStorage.setItem('user', JSON.stringify(user));
    },
  });
  // the page should be opened and the user should be logged in
});

describe('Loging-in', () => {
  console.log('Louis user', user);
  it('Visits localhost:3000 and connects', () => {
    cy.visit('https://localhost:3000/');
    cy.contains('type').click();
    cy.url().should('include', '/commands/actions');
    cy.get('.action-email')
      .type('fake@email.com')
      .should('have.value', 'fake@email.com');
  });
});

cypEmail && describe('Random VMR for ESG', function () {});
