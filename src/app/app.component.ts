import { Component } from '@angular/core';
import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { SettingsService } from './service/settings.service';
import { ModalSlidesPage } from './modal/modal-slides/modal-slides.page';
import { ModalController } from '@ionic/angular';
import { AlertController } from '@ionic/angular';
import { TableStorageService } from './service/table-storage.service';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {
  firstStart: boolean;

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    public settingsService: SettingsService,
    public modalController: ModalController,
    private statusBar: StatusBar,
    public tableStorageService: TableStorageService,
    public alertController: AlertController,
    public toastController: ToastController,
  ) {
    this.initializeApp();

    this.settingsService.isReady.subscribe(() => {
      let settings = this.settingsService.getSettings();

      if(settings.firstStart) {
        this.presentAlertConfirm();
      }

      if(settings == undefined || !settings.firstStart) {
        this.presentModal();
        this.firstStart = true;
        let returnSettings = {
          "defaultTime": false,
          "firstStart": true,
          "fullWeek": true
        }
        this.settingsService.updateSettings(returnSettings);
      }
    });
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  async presentModal() {
    const modal = await this.modalController.create({
      component: ModalSlidesPage
    });
    return await modal.present();
  }

  async presentAlertConfirm() {
    const alert = await this.alertController.create({
      header: 'Select the next step',
      message: '<img src="assets/slides/updatePreview.png"/>Now users can choose a <strong><u>Date</u></strong> when the lesson should begin, rather then picking the week.<br> If you choose <strong><u>Not To Reset</u></strong> all lessons, every individual lesson needs to be edited!',
      buttons: [
        {
          text: 'Manually',
          role: 'cancel',
          handler: () => {
            this.presentToast("Please edit all exsisting lessons!");
          }
        }, {
          text: 'Reset (Recommended)',
          handler: () => {
            this.tableStorageService.removeFromStorage();
            this.presentToast("Storage Schedule Cleared");
          }
        }
      ]
    });

    await alert.present();
  }

  async presentToast(message: string) {
    const toast = await this.toastController.create({
      message: message,
      duration: 1500
    });
    toast.present();
  }
}
