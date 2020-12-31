export interface UserForm {
  id: string;
  username: string;
  roles: string;
  plainPassword: string;
  plainPasswordRepeat: string;
}

export const validateUserForm = (values: UserForm) => {
  const errors: Partial<UserForm> = {};
  if (values.plainPassword !== values.plainPasswordRepeat) {
    errors.plainPassword = 'Las contraseñas no coinciden';
  }

  return errors;
};

export const transformUserForm = (values: UserForm) => ({
  ...values,
  roles: Array.isArray(values.roles) ? values.roles : [values.roles],
});
