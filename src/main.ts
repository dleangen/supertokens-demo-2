import {APP_INITIALIZER, enableProdMode, importProvidersFrom} from "@angular/core";
import {environment} from "./environments/environment";
import {bootstrapApplication} from "@angular/platform-browser";
import {AppComponent} from "./app/app.component";
import {RouterModule} from "@angular/router";
import {APP_ROUTES} from "./app/app.routes";
import * as SuperTokens from "supertokens-web-js";
import * as Session from "supertokens-web-js/recipe/session";

if (environment.production) {
    enableProdMode();
}

const initSuperTokens = () => SuperTokens.init({
  appInfo: {
    appName: "SuperTokens Demo",
    apiDomain: "http://localhost:3001",
  },
  recipeList: [Session.init()],
});

bootstrapApplication(AppComponent, {
  providers: [
    importProvidersFrom(RouterModule.forRoot(APP_ROUTES)),
    { provide: APP_INITIALIZER, useFactory: initSuperTokens},
  ],
})
