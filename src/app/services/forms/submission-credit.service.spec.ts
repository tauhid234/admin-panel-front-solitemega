import { TestBed } from '@angular/core/testing';

import { SubmissionCreditService } from './submission-credit.service';

describe('SubmissionCreditService', () => {
  let service: SubmissionCreditService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SubmissionCreditService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
