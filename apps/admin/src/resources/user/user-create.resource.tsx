import * as React from 'react';
import {
  Create,
  PasswordInput,
  required,
  SelectInput,
  SimpleForm,
  TextInput,
} from 'react-admin';
import * as uuid from 'uuid';

import { transformUserForm, validateUserForm } from './user.form';

const postDefaultValue = () => ({ id: uuid.v4(), roles: ['ROLE_USER'] });

export const UserCreate = (props) => (
  <Create {...props} transform={transformUserForm}>
    <SimpleForm initialValues={postDefaultValue} validate={validateUserForm}>
      <TextInput source="username" />
      <SelectInput
        source="roles"
        choices={[
          { id: 'ROLE_ADMIN', name: 'Administrador' },
          { id: 'ROLE_USER', name: 'Usuario' },
        ]}
      />
      <PasswordInput source="plainPassword" validate={[required()]} />
      <PasswordInput source="plainPasswordRepeat" validate={[required()]} />
    </SimpleForm>
  </Create>
);
