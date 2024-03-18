import { TestBed } from '@angular/core/testing';

import { ConsolesService } from './consoles.service';

describe('ConsolesService', () => {
  let service: ConsolesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ConsolesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
