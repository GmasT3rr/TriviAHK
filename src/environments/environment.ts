// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
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

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
