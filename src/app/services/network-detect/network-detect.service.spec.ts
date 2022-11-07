import { TestBed } from '@angular/core/testing';

import { NetworkDetectService } from './network-detect.service';

describe('NetworkDetectService', () => {
  let service: NetworkDetectService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NetworkDetectService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
