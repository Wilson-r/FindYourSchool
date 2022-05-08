import { TestBed } from '@angular/core/testing';

import { MarkerSService } from './marker-s.service';

describe('MarkerSService', () => {
  let service: MarkerSService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MarkerSService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
