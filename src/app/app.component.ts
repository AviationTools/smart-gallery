import { Component } from '@angular/core';
import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { SettingsService } from './service/settings.service';
import { ModalSlidesPage } from './modal/modal-slides/modal-slides.page';
import { ModalController } from '@ionic/angular';

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
    private statusBar: StatusBar
  ) {
    this.initializeApp();

    this.settingsService.isReady.subscribe(() => {
      let settings = this.settingsService.getSettings();

      if(settings == undefined || !settings.firstStart) {
        this.presentModal();
        this.firstStart = true;
        let returnSettings = {
          "defaultTime": false,
          "firstStart": true,
          "fullWeek": false
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
}
