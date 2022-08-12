import {Component} from "@angular/core";
import {CommonModule} from "@angular/common";
import {Router, RouterModule} from "@angular/router";
import {SupertokensAuthService} from "../services/supertokens-auth.service";
import {Observable} from "rxjs";

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
export class HomeComponent {

    public rootId = "rootId";
    public userId = "";
    userId$: Observable<string | null>;
    doesSessionExist$: Observable<boolean>;


  constructor(
    private auth: SupertokensAuthService,
    private router: Router) {
    this.doesSessionExist$ = auth.hasSession$;
    this.userId$ = auth.userId$;
  }

  onSignOut(): void {
      this.auth.signOut();
  }
}
