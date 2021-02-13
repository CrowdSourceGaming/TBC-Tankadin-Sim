import { TestBed } from '@angular/core/testing';

import { EnchantService } from './enchant.service';

describe('EnchantService', () => {
  let service: EnchantService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EnchantService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
