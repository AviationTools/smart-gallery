import { TestBed } from '@angular/core/testing';

import { CameraStorageService } from './camera-storage.service';

describe('CameraStorageService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CameraStorageService = TestBed.get(CameraStorageService);
    expect(service).toBeTruthy();
  });
});
