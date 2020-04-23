import { TestBed } from '@angular/core/testing';

import { ImageStorageService } from './image-storage.service';

describe('CameraStorageService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ImageStorageService = TestBed.get(ImageStorageService);
    expect(service).toBeTruthy();
  });
});
