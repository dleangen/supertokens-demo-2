import {APP_INITIALIZER, enableProdMode, importProvidersFrom} from "@angular/core";
import {environment} from "./environments/environment";
import {bootstrapApplication} from "@angular/platform-browser";
import {AppComponent} from "./app/app.component";
import {RouterModule} from "@angular/router";
import {APP_ROUTES} from "./app/app.routes";
import * as SuperTokens from "supertokens-web-js";
import * as Session from "supertokens-web-js/recipe/session";
import {FIREBASE_OPTIONS} from "@angular/fire/compat";
import {initializeApp, provideFirebaseApp} from "@angular/fire/app";
import {getFunctions, provideFunctions} from "@angular/fire/functions";
import {getFirestore, provideFirestore} from "@angular/fire/firestore";
import {USE_EMULATOR as USE_FIRESTORE_EMULATOR} from "@angular/fire/compat/firestore";
import {USE_EMULATOR as USE_FUNCTIONS_EMULATOR} from "@angular/fire/compat/functions";

if (environment.production) {
    enableProdMode();
}

const apiPort = 5001;
const apiDomain = `http://localhost:${apiPort}`;

const initSuperTokens = () => SuperTokens.init({
  appInfo: {
    appName: "SuperTokens Demo",
    apiDomain,
    apiBasePath: '/auth',
    apiGatewayPath: '/supertokens-demo-20220805/us-central1',
  },
  recipeList: [Session.init()],
});

bootstrapApplication(AppComponent, {
  providers: [
    importProvidersFrom(RouterModule.forRoot(APP_ROUTES)),
    { provide: APP_INITIALIZER, useFactory: initSuperTokens},
    { provide: FIREBASE_OPTIONS, useValue: environment.firebase },
    { provide: USE_FIRESTORE_EMULATOR, useValue: environment.useEmulators ? ['localhost', 8080] : undefined },
    { provide: USE_FUNCTIONS_EMULATOR, useValue: environment.useEmulators ? [apiDomain] : undefined },
    importProvidersFrom(
      provideFirebaseApp(() => initializeApp(environment.firebase)),
      provideFunctions(() => getFunctions()),
      // provideAuth(() => getAuth()),
      provideFirestore(() => getFirestore()),
    ),
  ],
})
