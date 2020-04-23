import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TabsPage } from './tabs.page';
import { HomePage } from '../home/home.page';
import { CameraPage } from '../camera/camera.page';
import { SettingsPage } from '../settings/settings.page';

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
      path:'settings',
      component: SettingsPage
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
    },
    {
      path: '',
      redirectTo: '/tabs/settings',
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
  },
  {
    path: '',
    redirectTo: '/tabs/settings',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TabsPageRoutingModule {}
