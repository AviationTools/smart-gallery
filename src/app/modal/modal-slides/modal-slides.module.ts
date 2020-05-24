import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ModalSlidesPageRoutingModule } from './modal-slides-routing.module';

import { ModalSlidesPage } from './modal-slides.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ModalSlidesPageRoutingModule
  ],
  declarations: [ModalSlidesPage]
})
export class ModalSlidesPageModule {}
