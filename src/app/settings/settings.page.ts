import { Component } from '@angular/core';
import { TableStorageService } from '../service/table-storage.service';
import { ImageStorageService } from '../service/image-storage.service';
import { SettingsService } from '../service/settings.service';
import { AlertController } from '@ionic/angular';
import { AppRate } from '@ionic-native/app-rate/ngx';
import { ToastController } from '@ionic/angular';

import { ModalSlidesPage } from '../modal/modal-slides/modal-slides.page';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss'],
})
export class SettingsPage {
  defaultTime: boolean;

  constructor(
    public tableStorageService: TableStorageService,
    public imageStorageService: ImageStorageService,
    public settingsService: SettingsService,
    public alertController: AlertController,
    public modalController: ModalController,
    public toastController: ToastController,
    private appRate: AppRate
    ) {}

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
            this.presentToast("Storage Schedule Cleared");
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
            this.imageStorageService.removeAllFromStorage();
            this.presentToast("Storage Images Cleared");
          }
        }
      ]
    });

    await alert.present();
  }

  rateApp() {
    // set certain preferences
    this.appRate.preferences.storeAppURL = {
      ios: '<app_id>',
      android: 'market://details?id=<package_name>',
      windows: 'ms-windows-store://review/?ProductId=<store_id>'
    }

    this.appRate.promptForRating(true);

    // or, override the whole preferences object
    this.appRate.preferences = {
      usesUntilPrompt: 3,
      storeAppURL: {
      ios: '<app_id>',
      android: 'market://details?id=<package_name>',
      windows: 'ms-windows-store://review/?ProductId=<store_id>'
      }
    }

    this.appRate.promptForRating(false);
  }

  timeToggle($event){
    let settings = {
      "defaultTime": $event.detail.checked,
      "firstStart": true
    }
    this.settingsService.updateSettings(settings);
  }

  async presentToast(message: string) {
    const toast = await this.toastController.create({
      message: message,
      duration: 1500
    });
    toast.present();
  }

  async presentModal() {
    const modal = await this.modalController.create({
      component: ModalSlidesPage
    });
    return await modal.present();
  }
}