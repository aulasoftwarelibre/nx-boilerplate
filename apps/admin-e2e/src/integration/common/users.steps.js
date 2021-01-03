import { Given, Then, When } from 'cypress-cucumber-preprocessor/steps';

import createPageFactory from '../../support/CreatePage';
import editPageFactory from '../../support/EditPage';
import listPageFactory from '../../support/ListPage';

const CreatePage = createPageFactory('/#/users/create');
const EditPage = editPageFactory('/#/users/4');
const ListPage = listPageFactory('/#/users');

Given('que estoy en la página de usuarios', () => {
  ListPage.navigate();
  ListPage.waitUntilDataLoaded();
});

Given('que estoy en la página de creación de usuarios', () => {
  CreatePage.navigate();
  CreatePage.waitUntilVisible();
});

When('relleno el formulario con los siguientes datos:', (table) => {
  console.info(table);
  CreatePage.setValues(
    table.rawTable.map((el) => ({ name: el[0], type: el[1], value: el[2] }))
  );
});

When('pulso guardar', () => {
  CreatePage.submit();
});

Then('tengo que ver {int} elementos', (count) => {
  cy.contains(`1-${count} of ${count}`);
});

Then('estoy en la página de edición del usuario {string}', (username) => {
  EditPage.waitUntilVisible();

  cy.get(EditPage.elements.input('username')).should((el) =>
    expect(el).to.have.value(username)
  );
});
