import { TestBed } from '@angular/core/testing';

import { BlizzardApiService } from './blizzard-api.service';

describe('BlizzardApiService', () => {
  let service: BlizzardApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BlizzardApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
