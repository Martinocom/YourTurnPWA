// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

import { FirebaseOptions } from "@firebase/app";

export const environment = {
  production: false,
  firebaseConfig: {
    apiKey: "AIzaSyCoVzuvVjFcil9hFrxnc5Say2F_2oNkTR0",
    authDomain: "your-turn-pwa-app.firebaseapp.com",
    projectId: "your-turn-pwa-app",
    storageBucket: "your-turn-pwa-app.appspot.com",
    messagingSenderId: "543815541663",
    appId: "1:543815541663:web:9bc5d009e51827b12f53aa"
  } as FirebaseOptions
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
