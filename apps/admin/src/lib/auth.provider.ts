import {
  isAccessToken,
  isCredentials,
  isJwtPayload,
  JwtPayloadInterface,
} from '@boilerplate/contracts';
import axios from 'axios';
import jwt from 'jwt-decode';
import { AuthProvider } from 'react-admin';

const authProvider: AuthProvider = {
  login: async ({ ...credentials }) => {
    if (!isCredentials(credentials)) {
      throw new Error('authProvider - missing attributes in credentials');
    }
    const res = await axios.post(`/api/login`, credentials);

    saveToken(res.data);
  },
  logout: () => {
    removeToken();
    return Promise.resolve();
  },
  checkError: ({ status }) => {
    if (status === 401 || status === 403) {
      removeToken();
      return Promise.reject();
    }
    return Promise.resolve();
  },
  checkAuth: () => {
    if (!isLogged()) {
      return Promise.reject();
    }

    if (!getDecodedToken().roles.includes('ROLE_ADMIN')) {
      return Promise.reject({
        message: 'Acceso exclusivo para administradores',
      });
    }

    return Promise.resolve();
  },
  getPermissions: () => {
    const { roles } = getDecodedToken();
    return getDecodedToken().roles ? Promise.resolve(roles) : Promise.reject();
  },
  getIdentity: () => {
    const { username: id } = getDecodedToken();

    return Promise.resolve({ id, fullName: id });
  },
};

const saveToken = (token) => {
  if (!isAccessToken(token)) {
    throw new Error(
      'authProvider - missing attributes in response access token'
    );
  }

  const decodedToken = jwt(token.access_token);

  if (!isJwtPayload(decodedToken)) {
    throw new Error('authProvider - missing attributes in response payload');
  }

  localStorage.setItem('auth', token.access_token);
};

const removeToken = () => localStorage.removeItem('auth');

const isLogged = (): boolean => !!getToken();

const getToken = (): string | null => localStorage.getItem('auth');

const getDecodedToken = (): JwtPayloadInterface => jwt(getToken());

export { authProvider, getToken };
