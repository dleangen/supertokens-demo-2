import { Injectable } from '@angular/core';
import * as Session from "supertokens-web-js/recipe/session";
import {BehaviorSubject, map, mergeMap, Observable, of, tap} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class SupertokensAuthService {

  hasSessionSubject = new BehaviorSubject<boolean>(false);
  hasSession$ = this.hasSessionSubject.asObservable();
  userId$ = this.hasSession$
    .pipe(
      mergeMap(hasSession => hasSession ? Session.getUserId() : of(null)),
      tap(result => console.log('User ID', result)),
    );

  constructor() { }

  async checkForSession(): Promise<boolean> {
    console.log('checkForSession');
    const doesSessionExist = await Session.doesSessionExist();
    console.log('Sessin exists?', doesSessionExist);
    this.hasSessionSubject.next(doesSessionExist);
    return doesSessionExist;
  }

  signOut(): Promise<void> {
    return Session.signOut();
  }
}
