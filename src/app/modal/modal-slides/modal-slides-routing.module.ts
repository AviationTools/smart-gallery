import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ModalSlidesPage } from './modal-slides.page';

const routes: Routes = [
  {
    path: '',
    component: ModalSlidesPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ModalSlidesPageRoutingModule {}
