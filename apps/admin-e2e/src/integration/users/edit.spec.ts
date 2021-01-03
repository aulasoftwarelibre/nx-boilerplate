import editPageFactory from '../../support/EditPage';
import loginPageFactory from '../../support/LoginPage';

describe('Edit users', () => {
  const EditPage = editPageFactory(
    '/#/users/f60d593d-9ea9-4add-8f6c-5d86dd8c9f87'
  );
  const LoginPage = loginPageFactory('/#/login');

  beforeEach(() => {
    EditPage.navigate();
    EditPage.waitUntilVisible();
  });

  before(() => {
    cy.task('db:teardown');
    cy.task('db:seed');

    LoginPage.navigate();
    LoginPage.login('admin', 'password');
  });

  it('should update a user', () => {
    EditPage.setInputValue('input', 'plainPassword', 'password');
    EditPage.setInputValue('input', 'plainPasswordRepeat', 'password');
    EditPage.submit();
    EditPage.navigate();

    cy.get(EditPage.elements.input('username')).should((el) =>
      expect(el).to.have.value('admin')
    );
    cy.get(EditPage.elements.input('plainPassword')).should(
      (el) => expect(el).to.be.empty
    );
  });
});
