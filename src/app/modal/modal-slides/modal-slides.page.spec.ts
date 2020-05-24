import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ModalSlidesPage } from './modal-slides.page';

describe('ModalSlidesPage', () => {
  let component: ModalSlidesPage;
  let fixture: ComponentFixture<ModalSlidesPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalSlidesPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ModalSlidesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
