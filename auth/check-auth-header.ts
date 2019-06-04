import { AUTH_TOKEN } from './auth-token';
import { IncomingHttpHeaders } from 'http';

export function isAuthorized(headers: IncomingHttpHeaders): boolean {
  return !!(headers.authorization && headers.authorization === AUTH_TOKEN);
}
