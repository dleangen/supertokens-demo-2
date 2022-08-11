import { AfterViewInit, Component } from "@angular/core";

import * as Session from "supertokens-web-js/recipe/session";
import {CommonModule} from "@angular/common";
import {RouterModule} from "@angular/router";

@Component({
    selector: "app-home",
    templateUrl: "./home.component.html",
    styleUrls: ["./home.component.css"],
    standalone: true,
    imports: [
      CommonModule,
      RouterModule,
    ],
})
export class HomeComponent implements AfterViewInit {

    public rootId = "rootId";
    public userId = "";
    public session = false;

    ngAfterViewInit() {
        this.getUserInfo();
    }

    async getUserInfo() {
        this.session = await Session.doesSessionExist();
        if (this.session) {
            this.userId = await Session.getUserId();
        }
    }

    async onLogout() {
        await Session.signOut();
        window.location.reload();
    }

    redirectToLogin() {
        window.location.href = "auth";
    }
}
