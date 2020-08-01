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
import { AppVersion } from '@ionic-native/app-version/ngx';
import * as moment from 'moment';
import { TimeTable } from './models/timetable';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {
  firstStart: boolean;
  timetable: TimeTable;

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    public settingsService: SettingsService,
    public modalController: ModalController,
    private statusBar: StatusBar,
    public tableStorageService: TableStorageService,
    public alertController: AlertController,
    public toastController: ToastController,
    private appVersion: AppVersion
  ) {
    this.initializeApp();

    this.settingsService.isReady.subscribe(() => {
      let settings = this.settingsService.getSettings();

      if(settings.version == undefined) {
        this.updateStorageToCurrent();
        this.appVersion.getVersionNumber().then((version) => {
          this.settingsService.updateSettings({
            "defaultTime": false,
            "firstStart": true,
            "fullWeek": true,
            "version": version
          });
        });
      }

      if(settings == undefined || !settings.firstStart) {
        this.presentModal();
        this.firstStart = true;
        this.appVersion.getVersionNumber().then((version) => {
          let returnSettings = {
            "defaultTime": false,
            "firstStart": true,
            "fullWeek": true,
            "version": version
          }
          this.settingsService.updateSettings(returnSettings);
        });
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

  async presentToast(message: string) {
    const toast = await this.toastController.create({
      message: message,
      duration: 1500
    });
    toast.present();
  }

  updateStorageToCurrent() {
    this.tableStorageService.isReady.subscribe(() => {
      let oldStorage = this.tableStorageService.getTimeTable();
      this.timetable = new TimeTable("test");
      
      if(oldStorage) {
        for (const lesson of oldStorage.getAllLessons()) {
          let oldDate = moment(lesson.timeFrame.fromTime);
          let updatedDate = oldDate.add(lesson.startingWeek, "weeks").toISOString();
          
          this.timetable.addLesson({
            "id": lesson.id,
            "subject": lesson.subject,
            "subjectID": lesson.subjectID,
            "weekDay": lesson.weekDay,
            "color": this.getNewColor(lesson.weekDay),
            "repeatWeek": lesson.repeatWeek,
            "startingDate": updatedDate,
            "timeFrame": {
              "fromTime": moment(lesson.timeFrame.fromTime).toISOString(),
              "toTime": moment(lesson.timeFrame.toTime).toISOString()
            },
            "codeTimeFrame": {
              "fromTime": lesson.codeTimeFrame.fromTime,
              "toTime": lesson.codeTimeFrame.toTime
            },
            "creationDate": oldDate.toISOString()
          });
        }
  
        for (const folder of oldStorage.getAllFolders()) {
          if(folder.id != 1111111) {
            this.timetable.addFolder({
              'id': folder.id,
              'subject': folder.subject,
              'subjectID': folder.subjectID,
              'color': folder.color
            });
          }
        }
        this.tableStorageService.removeFromStorage();
        this.tableStorageService.remove.subscribe(() => {
          //Update old with new
          this.tableStorageService.updateTimeTable(this.timetable);
        })
        this.presentToast("Storage Updated");
      }
    })
  }

  getNewColor(weekDay: string) {
    if(weekDay == "Monday") {
      return "secondary";
    } else if(weekDay == "Tuesday") {
      return "danger";
    }
    else if(weekDay == "Wednesday") {
      return "warning";
    }
    else if(weekDay == "Thursday") {
      return "success";
    }
    else if(weekDay == "Friday") {
      return "medium";
    }
    else if(weekDay == "Saturday") {
      return "tertiary";
    }
    else if(weekDay == "Sunday") {
      return "light";
    } else {
      return "secondary";
    }
  }
}
