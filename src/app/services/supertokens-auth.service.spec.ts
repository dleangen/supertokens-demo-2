import { TestBed } from '@angular/core/testing';

import { SupertokensAuthService } from './supertokens-auth.service';

describe('SupertokensAuthService', () => {
  let service: SupertokensAuthService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SupertokensAuthService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
