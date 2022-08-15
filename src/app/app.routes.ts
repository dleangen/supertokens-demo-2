import {Routes} from "@angular/router";
import {AuthComponent} from "./auth/auth.component";
import {HomeComponent} from "./home/home.component";
import {IsAuthenticatedGuard} from "./guards/is-authenticated.guard";
import {ItemsComponent} from "./components/items/items.component";

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
    path: 'items',
    title: 'SuperTokens Demo – Items',
    component: ItemsComponent,
  },
  {
    path: '**',
    title: 'SuperTokens Demo – Home',
    component: HomeComponent,
    canActivate: [IsAuthenticatedGuard],
  },
];
