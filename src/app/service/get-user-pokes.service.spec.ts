import { TestBed } from '@angular/core/testing';

import { GetUserPokesService } from './get-user-pokes.service';

describe('GetUserPokesService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: GetUserPokesService = TestBed.get(GetUserPokesService);
    expect(service).toBeTruthy();
  });
});
