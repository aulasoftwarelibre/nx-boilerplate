import React from 'react';
import { Admin, Resource } from 'react-admin';

import { Dashboard } from '../components';
import { authProvider, dataProvider } from '../lib';
import { UserCreate, UserEdit, UserList } from '../resources';

const App = () => (
  <Admin
    authProvider={authProvider}
    dashboard={Dashboard}
    dataProvider={dataProvider}
  >
    <Resource
      name="users"
      list={UserList}
      edit={UserEdit}
      create={UserCreate}
    />
  </Admin>
);

export default App;
