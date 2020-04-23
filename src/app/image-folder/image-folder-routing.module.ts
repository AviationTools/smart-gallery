import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ImageFolderPage } from './image-folder.page';

const routes: Routes = [
  {
    path: '',
    component: ImageFolderPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ImageFolderPageRoutingModule {}
