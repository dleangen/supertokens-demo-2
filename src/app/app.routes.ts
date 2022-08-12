import {Routes} from "@angular/router";
import {AuthComponent} from "./auth/auth.component";
import {HomeComponent} from "./home/home.component";
import {IsAuthenticatedGuard} from "./guards/is-authenticated.guard";

export const APP_ROUTES: Routes  = [
  {
    path: 'auth',
    title: 'SuperTokens Demo – Sign In',
    children: [
      {
        path: '**',
        component: AuthComponent,
      },
    ],
  },
  {
    path: '**',
    title: 'SuperTokens Demo – Home',
    component: HomeComponent,
    canActivate: [IsAuthenticatedGuard],
  },
];
