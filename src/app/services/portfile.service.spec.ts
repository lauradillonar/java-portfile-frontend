import { TestBed } from '@angular/core/testing';

import { PortfileService } from './portfile.service';

describe('PortfileService', () => {
  let service: PortfileService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PortfileService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
