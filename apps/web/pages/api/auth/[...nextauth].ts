import {
  isAccessToken,
  isCredentials,
  isJwtPayload,
} from '@boilerplate/contracts';
import axios from 'axios';
import jose from 'jose';
import jwt from 'jsonwebtoken';
import { NextApiRequest, NextApiResponse } from 'next';
import NextAuth, { InitOptions, User } from 'next-auth';
import Providers from 'next-auth/providers';

const options: InitOptions = {
  session: {
    jwt: true,
  },
  callbacks: {
    session: async (session, user) => {
      // @ts-expect-error: Custom session attributes
      session.roles = user.roles;
      return Promise.resolve(session);
    },
    jwt: async (token, user, account, profile, isNewUser) => {
      const isSignIn = user ? true : false;
      if (isSignIn) {
        token.roles = profile.roles;
      }
      return Promise.resolve(token);
    },
  },
  secret: process.env.JWT_SECRET,
  jwt: {
    secret: process.env.JWT_SECRET,
    encode: async ({ secret, token, maxAge }) => {
      const signingOptions: jose.JWT.SignOptions = {
        expiresIn: `${maxAge}s`,
        algorithm: 'HS512',
      };

      return jose.JWT.sign(token, secret, signingOptions);
    },
    // @ts-expect-error: Error in InitOptions declaration
    decode: async ({ secret, token, maxAge }) => {
      if (!token) return null;

      const verificationOptions = {
        maxTokenAge: `${maxAge}s`,
        algorithms: ['RS256', 'HS256', 'RS512', 'HS512'],
      };

      return jose.JWT.verify(token, secret, verificationOptions);
    },
  },
  providers: [
    Providers.Credentials({
      name: 'Credentials',
      credentials: {
        username: { label: 'Usuario', type: 'text' },
        password: { label: 'Contraseña', type: 'password' },
      },
      authorize: async (credentials): Promise<User> => {
        try {
          if (!isCredentials(credentials)) {
            console.error('next-auth - missing attributes in credentials');

            return Promise.resolve(null);
          }
          const res = await axios.post(
            `${process.env.NEXTAUTH_URL}/api/login`,
            credentials
          );

          if (!isAccessToken(res.data)) {
            console.error(
              'next-auth - missing attributes in response access token',
              JSON.stringify(res.data)
            );

            return Promise.resolve(null);
          }

          const verify = jwt.verify(
            res.data.access_token,
            process.env.JWT_SECRET
          );

          if (!isJwtPayload(verify)) {
            console.error(
              'next-auth - missing attributes in response payload',
              JSON.stringify(verify)
            );

            return Promise.resolve(null);
          }

          return Promise.resolve({
            name: verify.username,
            email: verify.username,
            roles: verify.roles,
          });
        } catch (e) {
          console.error('next-auth - error in credentials');
        }

        return Promise.resolve(null);
      },
    }),
  ],
};

export default (req: NextApiRequest, res: NextApiResponse): Promise<void> =>
  NextAuth(req, res, options);
