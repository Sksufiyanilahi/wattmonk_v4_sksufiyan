import { TestBed } from '@angular/core/testing';

import { NetworkdetectService } from './networkdetect.service';

describe('NetworkdetectService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: NetworkdetectService = TestBed.get(NetworkdetectService);
    expect(service).toBeTruthy();
  });
});
