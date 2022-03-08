import { TestBed } from '@angular/core/testing';

import { StatusPerkawinanService } from './status-perkawinan.service';

describe('StatusPerkawinanService', () => {
  let service: StatusPerkawinanService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StatusPerkawinanService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
