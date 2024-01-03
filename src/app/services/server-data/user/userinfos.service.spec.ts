import { TestBed } from '@angular/core/testing';

import { UserInfosService } from './userinfos.service';

describe('UserInfosService', () => {
  let service: UserInfosService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UserInfosService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
