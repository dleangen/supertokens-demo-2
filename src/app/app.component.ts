import {Component} from "@angular/core";
import {CommonModule} from "@angular/common";
import {RouterModule} from "@angular/router";

@Component({
    selector: "app-root",
    template: "<router-outlet></router-outlet>",
    standalone: true,
    imports: [
      CommonModule,
      RouterModule,
    ],
})
export class AppComponent {}
