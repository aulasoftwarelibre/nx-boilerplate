import createPageFactory from '../../support/CreatePage';
import editPageFactory from '../../support/EditPage';
import listPageFactory from '../../support/ListPage';
import loginPageFactory from '../../support/LoginPage';

describe('Create users', () => {
  const CreatePage = createPageFactory('/#/users/create');
  const LoginPage = loginPageFactory('/#/login');
  const ListPage = listPageFactory('/#/users');
  const EditPage = editPageFactory('/#/users/4');

  before(() => {
    cy.task('db:teardown');
    cy.task('db:seed');
  });

  beforeEach(() => {
    LoginPage.navigate();
    LoginPage.login('admin', 'password');
  });

  it('should create a regular user', () => {
    const values = [
      {
        type: 'input',
        name: 'username',
        value: 'johndoe',
      },
      {
        type: 'input',
        name: 'plainPassword',
        value: 'password',
      },
      {
        type: 'input',
        name: 'plainPasswordRepeat',
        value: 'password',
      },
    ];

    CreatePage.navigate();
    CreatePage.waitUntilVisible();
    CreatePage.setValues(values);
    CreatePage.submit();
    EditPage.waitUntilVisible();

    cy.get(EditPage.elements.input('username')).should((el) =>
      expect(el).to.have.value('johndoe')
    );
    cy.get(EditPage.elements.input('plainPassword')).should(
      (el) => expect(el).to.be.empty
    );
  });

  it('should appears in list page', () => {
    ListPage.navigate();
    ListPage.waitUntilDataLoaded();

    cy.contains('1-2 of 2');
  });
});
