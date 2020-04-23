import { Component, OnInit } from '@angular/core';
import { TableStorageService } from '../service/table-storage.service';
import { ImageStorageService } from '../service/image-storage.service';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss'],
})
export class SettingsPage implements OnInit {

  constructor(
    public tableStorageService: TableStorageService,
    public imageStorageService: ImageStorageService,
    public alertController: AlertController
    ) { }

  ngOnInit() {
  }

  async deleteTableStorage() {
    const alert = await this.alertController.create({
      message: 'Are you sure you want to delete everything ?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            console.log('Cancel');
          }
        }, {
          text: 'Ok',
          handler: () => {
            this.tableStorageService.removeFromStorage();
            console.log("Storage Table Cleared");
          }
        }
      ]
      
    });

    await alert.present();
  }

  async deleteImageStorage() {
    const alert = await this.alertController.create({
      message: 'Are you sure you want to delete everything ?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            console.log('Cancel');
          }
        }, {
          text: 'Ok',
          handler: () => {
            this.imageStorageService.removeFromStorage();
            console.log("Storage Images Cleared");
          }
        }
      ]
    });

    await alert.present();
  }
}
