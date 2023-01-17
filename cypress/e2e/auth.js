/// <reference types="cypress" />

import { decode } from "jsonwebtoken";
import authSettings from "./authsettings.json";

const {
  authority,
  clientId,
  clientSecret,
  apiScopes,
  username,
  password,
} = authSettings;

const environment = "login.windows.net";

const buildAccountEntity = (
  homeAccountId,
  realm,
  localAccountId,
  username,
  name
) => {
  return {
    authorityType: "MSSTS",
    // This value does not seem to get used, so we can leave it out.
    clientInfo: "",
    homeAccountId: homeAccountId,
    environment: environment,
    realm: realm,
    localAccountId: localAccountId,
    username: username,
    name: name,
  };
};

const buildIdTokenEntity = (
  homeAccountId, 
  idToken, 
  realm
) => {
  return {
    credentialType: "IdToken",
    homeAccountId: homeAccountId,
    environment: environment,
    clientId: clientId,
    secret: idToken,
    realm: realm,
  };
};

const buildAccessTokenEntity = (
  homeAccountId,
  accessToken,
  expiresIn,
  extExpiresIn,
  realm,
  scopes
) => {
  const now = Math.floor(Date.now() / 1000);
  return {
    homeAccountId: homeAccountId,
    credentialType: "AccessToken",
    secret: accessToken,
    cachedAt: now.toString(),
    expiresOn: (now + expiresIn).toString(),
    extendedExpiresOn: (now + extExpiresIn).toString(),
    environment: environment,
    clientId: clientId,
    realm: realm,
    target: scopes.toLowerCase(),
    // Scopes _must_ be lowercase or the token won't be found
  };
};

const buildRefreshTokenEntity = (
  clientId,
  environment,
  homeAccountId,
  refreshToken
) => {
  return {
    clientId: clientId,
    credentialType: "RefreshToken",
    environment: environment,
    homeAccountId: homeAccountId,
    secret: refreshToken
  };
}

const injectTokens = (tokenResponse) => {
  const idToken = decode(tokenResponse.id_token);
  const localAccountId = idToken.oid || idToken.sid;
  const realm = idToken.tid;
  const homeAccountId = `${localAccountId}.${realm}`;
  const username = idToken.preferred_username;
  const name = idToken.name;

  const accountKey = `${homeAccountId}-${environment}-${realm}`;
  const accountEntity = buildAccountEntity(
    homeAccountId,
    realm,
    localAccountId,
    username,
    name
  );

  const idTokenKey = `${homeAccountId}-${environment}-idtoken-${clientId}-${realm}-`;
  const idTokenEntity = buildIdTokenEntity(
    homeAccountId,
    tokenResponse.id_token,
    realm
  );

  const accessTokenKey = `${homeAccountId}-${environment}-accesstoken-${clientId}-${realm}-${apiScopes}`;
  const accessTokenEntity = buildAccessTokenEntity(
    homeAccountId,
    tokenResponse.access_token,
    tokenResponse.expires_in,
    tokenResponse.ext_expires_in,
    realm,
    apiScopes
  );
  
  const refreshTokenKey = `${homeAccountId}-${environment}-refreshtoken-${clientId}--`;
  const refreshTokenEntity = buildRefreshTokenEntity(
    clientId,
    environment,
    homeAccountId,
    tokenResponse.refresh_token
  );

  localStorage.setItem(accountKey, JSON.stringify(accountEntity));
  localStorage.setItem(idTokenKey, JSON.stringify(idTokenEntity));
  localStorage.setItem(accessTokenKey, JSON.stringify(accessTokenEntity));
  localStorage.setItem(refreshTokenKey, JSON.stringify(refreshTokenEntity));
};

//this function will be called by your tests scripts to ensure the user is logged in before running the tests
export const login = (cachedTokenResponse) => {
  let tokenResponse = null;
  let chainable = cy.visit("https://freekvlier.github.io/sportscentre-frontend/");

  if (!cachedTokenResponse) {
    chainable = chainable.request({
      url: authority + "/oauth2/v2.0/token",
      method: "POST",
      body: {
        grant_type: "password",
        client_id: clientId,
        client_secret: clientSecret,
        //openid and profile scopes are needed to get an idToken
        //offline_access scope is needed to get a refreshToken
        scope: ["openid profile offline_access"].concat(apiScopes).join(" "),
        username: username,
        password: password,
      },
      form: true,
    });
  } else {
    chainable = chainable.then(() => {
      return {
        body: cachedTokenResponse,
      };
    });
  }

  chainable
    .then((response) => {
      injectTokens(response.body);
      tokenResponse = response.body;
    })
    .reload()
    .then(() => {
      return tokenResponse;
    });

  return chainable;
};