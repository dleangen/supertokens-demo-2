import { Injectable } from '@angular/core';
import * as Session from "supertokens-web-js/recipe/session";
import {BehaviorSubject, mergeMap, of, tap} from "rxjs";

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

  constructor() { }

  async checkForSession(): Promise<boolean> {
    console.log('Checking for session...');
    const doesSessionExist = await Session.doesSessionExist();
    this.hasSessionSubject.next(doesSessionExist);
    console.log('Session exists', doesSessionExist);
    return doesSessionExist;
  }

  signOut(): Promise<void> {
    return Session.signOut()
      .then(() => this.hasSessionSubject.next(false));
  }
}
