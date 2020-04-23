import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ImageFolderPage } from './image-folder.page';

describe('ImageFolderPage', () => {
  let component: ImageFolderPage;
  let fixture: ComponentFixture<ImageFolderPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ImageFolderPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ImageFolderPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
