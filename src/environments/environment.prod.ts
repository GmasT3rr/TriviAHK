export const environment = {
  production: true,
  auth: {
    domain: 'desa-trivias-ahk.us.auth0.com',
    clientId: 'iNiAunbi7ulp9sllI4z5VbKqyhprWwG9',
    redirectUri: window.location.origin,
    audiece: 'http://localhost:3000'
  },
  dev: {
    serverUrl: 'http://localhost:3000'
  },
  socket: {
    serverUrl: 'http://localhost:3000/juego'
  }
};
