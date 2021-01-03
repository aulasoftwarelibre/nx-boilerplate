import { Before, Given, Then } from 'cypress-cucumber-preprocessor/steps';

Before(() => {
  cy.visit('/');
});

Given('the user is logged in', () => {
  cy.login('my-email@something.com', 'myPassword');
});

Then('the {string} message is displayed', (message: string) => {
  cy.get('h1').contains(message);
});
