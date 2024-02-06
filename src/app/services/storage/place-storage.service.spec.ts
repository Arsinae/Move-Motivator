import { TestBed } from '@angular/core/testing';

import { PlaceStorageService } from './place-storage.service';

describe('PlaceStorageService', () => {
  let service: PlaceStorageService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PlaceStorageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
