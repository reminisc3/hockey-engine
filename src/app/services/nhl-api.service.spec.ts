import { TestBed } from '@angular/core/testing';

import { NhlApiService } from './nhl-api.service';

describe('NhlApiService', () => {
  let service: NhlApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NhlApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
