import { TestBed } from '@angular/core/testing';

import { VisitorTrackingService } from './visitor-tracking.service';

describe('VisitorTrackingService', () => {
  let service: VisitorTrackingService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(VisitorTrackingService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
