import config from '../../auth_config.json';

const { domain, clientId, audience, apiUri, errorPath } = config as {
  domain: string;
  clientId: string;
  audience?: string;
  apiUri: string;
  errorPath: string;
};

export const environment = {
  production: true,
  auth: {
    domain,
    clientId,
    audience,
    redirectUri: window.location.origin,
    errorPath
  },
  httpInterceptor: {
    allowedList: [`${apiUri}/user-videos/*`],
  },
  authExtensionHttpInterceptor: {
    allowedList:[`${apiUri}/auth0/*`]
  }
};