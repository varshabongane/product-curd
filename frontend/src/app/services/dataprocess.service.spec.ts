import { TestBed } from '@angular/core/testing';

import { DataprocessService } from './dataprocess.service';

describe('DataprocessService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: DataprocessService = TestBed.get(DataprocessService);
    expect(service).toBeTruthy();
  });
});
