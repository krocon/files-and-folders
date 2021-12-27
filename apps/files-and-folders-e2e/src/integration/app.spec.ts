import {getGreeting} from '../support/app.po';

describe('files-and-folders', () => {
  beforeEach(() => cy.visit('/'));

  it('should display welcome message', () => {
    // Custom command example, see `../support/commands.ts` file-content
    cy.login('my-email@something.com', 'myPassword');

    // Function helper example, see `../support/app.po.ts` file-content
    getGreeting().contains('Welcome to files-and-folders!');
  });
});
