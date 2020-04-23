import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TabsPageRoutingModule } from './tabs-routing.module';

import { TabsPage } from './tabs.page';
import { HomePage } from '../home/home.page';
import { CameraPage } from '../camera/camera.page';
import { SettingsPage } from '../settings/settings.page';
import { LessonComponent } from '../lesson/lesson.component'

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TabsPageRoutingModule
  ],
  declarations: [TabsPage, HomePage, LessonComponent, CameraPage, SettingsPage]
})
export class TabsPageModule {}
