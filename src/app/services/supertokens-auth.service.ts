import { Injectable } from '@angular/core';
import * as Session from "supertokens-web-js/recipe/session";
import {BehaviorSubject, mergeMap, of} from "rxjs";
import {FirebaseAuthService} from "./firebase-auth.service";

@Injectable({
  providedIn: 'root'
})
export class SupertokensAuthService {

  hasSessionSubject = new BehaviorSubject<boolean>(false);
  hasSession$ = this.hasSessionSubject.asObservable();
  userId$ = this.hasSession$
    .pipe(
      mergeMap(hasSession => hasSession ? Session.getUserId() : of(null)),
    );

  constructor(private firebase: FirebaseAuthService) { }

  async checkForSession(): Promise<boolean> {
    const doesSuperTokensSessionExist = await Session.doesSessionExist();
    this.hasSessionSubject.next(doesSuperTokensSessionExist);
    if (doesSuperTokensSessionExist) {
      const token = (await Session.getAccessTokenPayloadSecurely()).firebaseToken;
      // Don't need to await this: run in parallel
      this.firebase.signInOrRefreshSession(token);
    }
    return doesSuperTokensSessionExist;
  }

  signOut(): Promise<void> {
    return Session.signOut()
      .then(() => this.firebase.signOut())
      .then(() => this.hasSessionSubject.next(false));
  }
}
