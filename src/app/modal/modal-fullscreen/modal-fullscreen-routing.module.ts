import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ModalFullscreenPage } from './modal-fullscreen.page';

const routes: Routes = [
  {
    path: '',
    component: ModalFullscreenPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ModalFullscreenPageRoutingModule {}
