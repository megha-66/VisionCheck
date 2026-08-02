const OAUTH_STORAGE_KEY = 'visioncheck-oauth-session';
const OAUTH_STATE_KEY = 'visioncheck-oauth-state';
const OAUTH_RETURN_TO_KEY = 'visioncheck-oauth-return-to';

const getRedirectUri = () => `${window.location.origin}/auth/callback`;

export const getOAuthConfig = () => ({
  authorizationUrl: import.meta.env.VITE_OAUTH_AUTHORIZATION_URL || '',
  clientId: import.meta.env.VITE_OAUTH_CLIENT_ID || '',
  providerName: import.meta.env.VITE_OAUTH_PROVIDER_NAME || 'OAuth Provider',
  redirectUri: import.meta.env.VITE_OAUTH_REDIRECT_URI || getRedirectUri(),
  scope: import.meta.env.VITE_OAUTH_SCOPE || 'openid email profile',
});

export const getOAuthSession = () => {
  const storedSession = localStorage.getItem(OAUTH_STORAGE_KEY);

  if (!storedSession) {
    return null;
  }

  const session = JSON.parse(storedSession);

  if (session.expiresAt && Date.now() > session.expiresAt) {
    localStorage.removeItem(OAUTH_STORAGE_KEY);
    return null;
  }

  return session;
};

export const isOAuthAuthenticated = () => Boolean(getOAuthSession()?.accessToken);

export const clearOAuthSession = () => {
  localStorage.removeItem(OAUTH_STORAGE_KEY);
  localStorage.removeItem(OAUTH_STATE_KEY);
  localStorage.removeItem(OAUTH_RETURN_TO_KEY);
};

export const startOAuthLogin = (returnTo = '/') => {
  const config = getOAuthConfig();

  if (!config.authorizationUrl || !config.clientId) {
    throw new Error('OAuth is not configured. Set VITE_OAUTH_AUTHORIZATION_URL and VITE_OAUTH_CLIENT_ID.');
  }

  const state = crypto.randomUUID();
  localStorage.setItem(OAUTH_STATE_KEY, state);
  localStorage.setItem(OAUTH_RETURN_TO_KEY, returnTo);

  const params = new URLSearchParams({
    client_id: config.clientId,
    redirect_uri: config.redirectUri,
    response_type: 'token',
    scope: config.scope,
    state,
  });

  window.location.assign(`${config.authorizationUrl}?${params.toString()}`);
};

export const completeOAuthLogin = () => {
  const hashParams = new URLSearchParams(window.location.hash.replace(/^#/, ''));
  const queryParams = new URLSearchParams(window.location.search);
  const params = hashParams.size ? hashParams : queryParams;
  const error = params.get('error');

  if (error) {
    throw new Error(params.get('error_description') || error);
  }

  const accessToken = params.get('access_token');
  const returnedState = params.get('state');
  const expectedState = localStorage.getItem(OAUTH_STATE_KEY);

  if (!accessToken) {
    throw new Error('OAuth provider did not return an access token.');
  }

  if (!expectedState || returnedState !== expectedState) {
    throw new Error('OAuth state did not match. Please try signing in again.');
  }

  const expiresInSeconds = Number(params.get('expires_in') || 3600);
  const session = {
    accessToken,
    expiresAt: Date.now() + expiresInSeconds * 1000,
    provider: getOAuthConfig().providerName,
    tokenType: params.get('token_type') || 'Bearer',
  };

  localStorage.setItem(OAUTH_STORAGE_KEY, JSON.stringify(session));
  const returnTo = localStorage.getItem(OAUTH_RETURN_TO_KEY) || '/';

  localStorage.removeItem(OAUTH_STATE_KEY);
  localStorage.removeItem(OAUTH_RETURN_TO_KEY);

  return { returnTo, session };
};
