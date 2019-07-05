import { TestBed } from '@angular/core/testing';

import { AjaxCallService } from './ajax-call.service';

describe('AjaxCallService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AjaxCallService = TestBed.get(AjaxCallService);
    expect(service).toBeTruthy();
  });
});
