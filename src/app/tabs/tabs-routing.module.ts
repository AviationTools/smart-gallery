import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TabsPage } from './tabs.page';
import { HomePage } from '../home/home.page';
import { CameraPage } from '../camera/camera.page';

const routes: Routes = [
  {
    path: '',
    component: TabsPage,
    children:[{
      path:'home',
      component: HomePage
    },
    {
      path:'camera',
      component: CameraPage
    },
    {
      path: '',
      redirectTo: '/tabs/home',
      pathMatch: 'full'
    },
    {
      path: '',
      redirectTo: '/tabs/camera',
      pathMatch: 'full'
    }
    ]
  },
  {
    path: '',
    redirectTo: '/tabs/home',
    pathMatch: 'full'
  },
  {
    path: '',
    redirectTo: '/tabs/camera',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TabsPageRoutingModule {}
