import {Component, OnInit} from "@angular/core";

import * as SuperTokens from "supertokens-web-js";
import * as Session from "supertokens-web-js/recipe/session";
import {CommonModule} from "@angular/common";
import {RouterModule} from "@angular/router";

SuperTokens.init({
    appInfo: {
        appName: "SuperTokens Demo",
        apiDomain: "http://localhost:3001",
    },
    recipeList: [Session.init()],
});

@Component({
    selector: "app-root",
    template: "<router-outlet></router-outlet>",
    standalone: true,
    imports: [
      CommonModule,
      RouterModule,
    ],
})
export class AppComponent implements OnInit {

  ngOnInit():void {
    console.log('AppComponent ngOnInit');
  }
}
