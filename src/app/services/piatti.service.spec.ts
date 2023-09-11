import { TestBed } from '@angular/core/testing';

import { PiattiService } from './piatti.service';

describe('PiattiService', () => {
  let service: PiattiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PiattiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
