import { Before } from 'cypress-cucumber-preprocessor/steps';

Before(() => {
  cy.server();
});
