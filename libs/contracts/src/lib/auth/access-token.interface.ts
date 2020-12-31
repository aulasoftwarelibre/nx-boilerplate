export interface AccessTokenInterface {
  access_token: string;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function isAccessToken(arg: any): arg is AccessTokenInterface {
  return arg && arg.access_token;
}
