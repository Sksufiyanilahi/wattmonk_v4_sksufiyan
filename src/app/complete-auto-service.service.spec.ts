import { TestBed } from '@angular/core/testing';

import { CompleteAutoServiceService } from './complete-auto-service.service';

describe('CompleteAutoServiceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CompleteAutoServiceService = TestBed.get(CompleteAutoServiceService);
    expect(service).toBeTruthy();
  });
});
