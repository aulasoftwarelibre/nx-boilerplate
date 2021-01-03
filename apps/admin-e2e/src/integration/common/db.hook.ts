import { Before } from 'cypress-cucumber-preprocessor/steps';

Before(() => {
  cy.task('db:teardown');
  cy.task('db:seed');
  console.info('RUN');
});
