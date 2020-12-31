import jsonServerProvider from 'ra-data-json-server';
import { fetchUtils } from 'react-admin';

import { getToken } from './auth.provider';

const httpClient = (url, options = { headers: undefined }) => {
  if (!options.headers) {
    options.headers = new Headers({ Accept: 'application/json' });
  }

  const access_token = getToken();
  options.headers.set('Authorization', `Bearer ${access_token}`);
  return fetchUtils.fetchJson(url, options);
};

export const dataProvider = jsonServerProvider(`/api`, httpClient);
