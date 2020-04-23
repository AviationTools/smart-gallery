import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ImageFolderPageRoutingModule } from './image-folder-routing.module';

import { ImageFolderPage } from './image-folder.page';
import { ImagesComponent } from '../images/images.component';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ImageFolderPageRoutingModule
  ],
  declarations: [ImageFolderPage, ImagesComponent]
})
export class ImageFolderPageModule {}