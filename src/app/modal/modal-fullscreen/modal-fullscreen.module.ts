import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ModalFullscreenPageRoutingModule } from './modal-fullscreen-routing.module';

import { ModalFullscreenPage } from './modal-fullscreen.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ModalFullscreenPageRoutingModule
  ],
  declarations: [ModalFullscreenPage]
})
export class ModalFullscreenPageModule {}
