import { Component, OnDestroy, AfterViewInit } from "@angular/core";
import * as React from "react";
import SuperTokensReactComponent from "./supertokens";
import {CommonModule} from "@angular/common";
import {RouterModule} from "@angular/router";
import {createRoot, Root} from "react-dom/client";

@Component({
    selector: "app-auth",
    template: '<div [id]="rootId"></div>',
    standalone: true,
    imports: [
      CommonModule,
      RouterModule,
    ],
})
export class AuthComponent implements OnDestroy, AfterViewInit {

    public rootId = "rootId";
    root!: Root;

    ngAfterViewInit() {
      const container = document.getElementById(this.rootId);
      this.root = createRoot(container!);
      this.root.render(React.createElement(SuperTokensReactComponent));
    }

    ngOnDestroy() {
        this.root.unmount();
    }
}
