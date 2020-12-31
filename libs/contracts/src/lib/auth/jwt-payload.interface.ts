export interface JwtPayloadInterface {
  username: string;
  roles: string[];
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function isJwtPayload(arg: any): arg is JwtPayloadInterface {
  return arg && arg.username && arg.roles;
}
