import { TestBed } from '@angular/core/testing';

import { PersonGuardService } from './person-guard.service';

describe('PersonGuardService', () => {
  let service: PersonGuardService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PersonGuardService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
