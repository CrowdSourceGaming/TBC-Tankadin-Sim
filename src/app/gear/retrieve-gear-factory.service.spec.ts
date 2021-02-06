import { TestBed } from '@angular/core/testing';

import { RetrieveGearFactoryService } from './retrieve-gear-factory.service';

describe('RetrieveGearFactoryService', () => {
  let service: RetrieveGearFactoryService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RetrieveGearFactoryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
