import { Component } from '@angular/core';
import { TableStorageService } from '../service/table-storage.service';
import { ImageStorageService } from '../service/image-storage.service';
import { SettingsService } from '../service/settings.service';
import { AlertController } from '@ionic/angular';
import { AppRate } from '@ionic-native/app-rate/ngx';
import { ToastController } from '@ionic/angular';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';
import { ModalSlidesPage } from '../modal/modal-slides/modal-slides.page';
import { ModalController } from '@ionic/angular';
import { SocialSharing } from '@ionic-native/social-sharing/ngx';
import { AppVersion } from '@ionic-native/app-version/ngx';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss'],
})
export class SettingsPage {
  defaultTime: boolean;
  fullWeek: boolean;
  appVersionNumber: string;

  constructor(
    public tableStorageService: TableStorageService,
    public imageStorageService: ImageStorageService,
    public settingsService: SettingsService,
    public alertController: AlertController,
    public modalController: ModalController,
    public toastController: ToastController,
    private iab: InAppBrowser,
    private socialSharing: SocialSharing,
    private appRate: AppRate,
    private appVersion: AppVersion
    ) {
      setTimeout(() => {
        this.defaultTime = this.settingsService.getSettings().defaultTime;
        this.fullWeek = this.settingsService.getSettings().fullWeek;
      }, 500);
      //Retrive App Version
      this.appVersion.getVersionNumber().then((version) => {
        this.appVersionNumber = version;
      });
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

  appTeilen() {
    this.socialSharing.share("Try this app out and start organizing your images ", null, null, "https://play.google.com/store/apps/details?id=com.smartgallery.app");
  }

  rateApp() {
    
    this.appRate.preferences.storeAppURL = {
      android: 'market://details?id=com.smartgallery.app'
    }
    this.appRate.preferences.displayAppName = 'Smart Gallery';
    this.appRate.preferences.usesUntilPrompt = 5;
    
    this.appRate.preferences.callbacks = {
      handleNegativeFeedback: (() => {
        this.socialSharing.shareViaEmail(null, "Problem or Bug", ["smartgallery@web.de"]);
      }),
      onRateDialogShow: ((callback) => {
        callback(1); // cause immediate click on 'Rate Now' button
      })
    }
    
    this.appRate.promptForRating(true);
  }

  settingsToggle($event , option: string){
    if(option == "defaultTime") {
      let settings = {
        "defaultTime": $event.detail.checked,
        "firstStart": true,
        "fullWeek": this.fullWeek,
      }
      this.settingsService.updateSettings(settings);
    }
    if(option == "fullWeek") {
      let settings = {
        "defaultTime": this.defaultTime,
        "firstStart": true,
        "fullWeek": $event.detail.checked,
      }
      this.settingsService.updateSettings(settings);
    }
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