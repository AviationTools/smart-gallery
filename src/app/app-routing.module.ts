import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { ImageFolderPage } from './image-folder/image-folder.page';

const routes: Routes = [
  { path: '', redirectTo: 'tabs', pathMatch: 'full' },
  { path: 'tabs', loadChildren: './tabs/tabs.module#TabsPageModule' },
  // { path: 'image-folder', page: ImageFolderPage },
  {
    path: 'camera',
    loadChildren: () => import('./camera/camera.module').then( m => m.CameraPageModule)
  },
  {
    path: 'settings',
    loadChildren: () => import('./settings/settings.module').then( m => m.SettingsPageModule)
  },
  {
    path: 'images',
    loadChildren: () => import('./images/images.component').then( m => m.ImagesComponent)
  },
  {
    path: 'image-folder',
    loadChildren: () => import('./image-folder/image-folder.module').then( m => m.ImageFolderPageModule)
  },  {
    path: 'modal-fullscreen',
    loadChildren: () => import('./modal/modal-fullscreen/modal-fullscreen.module').then( m => m.ModalFullscreenPageModule)
  },



  // {
  //   path: 'tabs',
  //   loadChildren: () => import('./tabs/tabs.module').then(m => m.TabsPageModule)
  // }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
