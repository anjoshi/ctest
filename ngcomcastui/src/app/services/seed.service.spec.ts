import { TestBed, inject } from '@angular/core/testing';

import { SeedService } from './seed.service';

describe('SeedService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SeedService]
    });
  });

  it('should be created', inject([SeedService], (service: SeedService) => {
    expect(service).toBeTruthy();
  }));
});
