import { TestBed } from '@angular/core/testing';

import { InitUserInfoService } from './init-user-info.service';

describe('InitUserInfoService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: InitUserInfoService = TestBed.get(InitUserInfoService);
    expect(service).toBeTruthy();
  });
});
