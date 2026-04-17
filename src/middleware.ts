import { defineMiddleware } from 'astro:middleware';
import { timingSafeEqual } from 'node:crypto';

const KEYSTATIC_PATH = '/keystatic';
const REALM = 'Restricted area';

const parseAllowedIps = () => {
  const raw = process.env.KEYSTATIC_ALLOWED_IPS;
  if (!raw) return new Set<string>();
  return new Set(
    raw
      .split(',')
      .map((ip) => ip.trim())
      .filter(Boolean)
  );
};

const getClientIp = (request: Request) => {
  const netlifyIp = request.headers.get('x-nf-client-connection-ip');
  if (netlifyIp) return netlifyIp.trim();

  const forwardedFor = request.headers.get('x-forwarded-for');
  if (!forwardedFor) return '';

  return forwardedFor.split(',')[0]?.trim() ?? '';
};

const safeEqual = (left: string, right: string) => {
  const leftBuffer = Buffer.from(left);
  const rightBuffer = Buffer.from(right);
  if (leftBuffer.length !== rightBuffer.length) return false;
  return timingSafeEqual(leftBuffer, rightBuffer);
};

const isAuthorizedByBasicAuth = (
  authorizationHeader: string,
  expectedUser: string,
  expectedPassword: string
) => {
  if (!authorizationHeader.startsWith('Basic ')) return false;

  const encoded = authorizationHeader.slice('Basic '.length).trim();
  let decoded = '';
  try {
    decoded = Buffer.from(encoded, 'base64').toString('utf-8');
  } catch {
    return false;
  }

  const separatorIndex = decoded.indexOf(':');
  if (separatorIndex === -1) return false;

  const user = decoded.slice(0, separatorIndex);
  const password = decoded.slice(separatorIndex + 1);

  return safeEqual(user, expectedUser) && safeEqual(password, expectedPassword);
};

const unauthorized = () =>
  new Response('Authentication required', {
    status: 401,
    headers: {
      'WWW-Authenticate': `Basic realm="${REALM}", charset="UTF-8"`,
      'Cache-Control': 'no-store',
    },
  });

const forbiddenMisconfigured = () =>
  new Response('Keystatic access protection is misconfigured', {
    status: 503,
    headers: {
      'Cache-Control': 'no-store',
    },
  });

export const onRequest = defineMiddleware(async (context, next) => {
  const { pathname } = context.url;
  const isKeystaticRoute = pathname === KEYSTATIC_PATH || pathname.startsWith(`${KEYSTATIC_PATH}/`);

  if (!isKeystaticRoute || import.meta.env.DEV) {
    return next();
  }

  const allowedIps = parseAllowedIps();
  const clientIp = getClientIp(context.request);
  if (clientIp && allowedIps.has(clientIp)) {
    return next();
  }

  const expectedUser = process.env.KEYSTATIC_BASIC_AUTH_USER ?? '';
  const expectedPassword = process.env.KEYSTATIC_BASIC_AUTH_PASS ?? '';

  if (!expectedUser || !expectedPassword) {
    return forbiddenMisconfigured();
  }

  const authorizationHeader = context.request.headers.get('authorization') ?? '';
  if (!isAuthorizedByBasicAuth(authorizationHeader, expectedUser, expectedPassword)) {
    return unauthorized();
  }

  return next();
});
