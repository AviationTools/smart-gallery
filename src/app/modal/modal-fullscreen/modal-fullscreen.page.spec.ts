import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ModalFullscreenPage } from './modal-fullscreen.page';

describe('ModalFullscreenPage', () => {
  let component: ModalFullscreenPage;
  let fixture: ComponentFixture<ModalFullscreenPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalFullscreenPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ModalFullscreenPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
