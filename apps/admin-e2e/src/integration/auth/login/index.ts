import { Given, Then, When } from 'cypress-cucumber-preprocessor/steps';

Given('que estoy en la página de inicio de sesión', () => {
  cy.visit('/#/login');
});

When('introduzco el usuario y la contraseña de administrador', () => {
  const username = 'admin';
  const password = 'password';

  cy.get('input[name=username]').type(username);
  cy.get('input[name=password]').type(`${password}{enter}`);
});

When('introduzco mal la contraseña de administrador', () => {
  const username = 'admin';
  const password = 'password2';

  cy.get('input[name=username]').type(username);
  cy.get('input[name=password]').type(`${password}{enter}`);
});

When('introduzco el usuario y la contraseña de un usuario normal', () => {
  const username = 'user';
  const password = 'password';

  cy.get('input[name=username]').type(username);
  cy.get('input[name=password]').type(`${password}{enter}`);
});

Then('debo estar en la página principal', () => {
  cy.url().should('include', '/');

  cy.get('span').should('contain', 'admin');
});

Then('debo recibir un mensaje de permiso denegado', () => {
  cy.contains('Request failed with status code 401');
});

Then('debo recibir un mensaje de que mi usuario no es administrador', () => {
  cy.contains('Acceso exclusivo para administradores');
});
