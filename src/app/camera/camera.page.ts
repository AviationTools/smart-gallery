import { Component } from '@angular/core';
import { ImageStorageService } from '../service/image-storage.service';
import { TableStorageService } from '../service/table-storage.service';
import { TimeTable } from '../models/timetable';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { Router, NavigationExtras } from '@angular/router';
import { AndroidPermissions } from '@ionic-native/android-permissions/ngx';
import { SettingsService } from '../service/settings.service';
import { AlertController, ToastController } from '@ionic/angular';
import * as moment from 'moment';

@Component({
  selector: 'app-camera',
  templateUrl: './camera.page.html',
  styleUrls: ['./camera.page.scss'],
})
export class CameraPage {
  pictureArray: any[];
  clickedImage: string;
  imageTable: any;
  imagesList: any[];
  weekDay: string;
  timetable: TimeTable;
  folderList: any[];
  alertOpened: boolean;

  constructor(
    public tableStorageService: TableStorageService,
    private imageStorageService: ImageStorageService,
    public settingsService: SettingsService,
    private androidPermissions: AndroidPermissions,
    public alertController: AlertController,
    public toastController: ToastController,
    private camera: Camera,
    private router: Router
    ) { 
      this.alertOpened = false;
      this.weekDay = this.getTodaysDay();
      this.timetable = this.tableStorageService.getTimeTable();
 
      this.imageStorageService.isReady.subscribe(() => {
        this.imageTable = this.imageStorageService.getImageTable();
        this.getTableSubjectList();
      });
      
      this.imageStorageService.updated.subscribe(() => {
        this.getTableSubjectList();
      });

      this.tableStorageService.updated.subscribe(() => {
        this.getTableSubjectList();
      });
    }

  ionViewDidEnter() {
    setTimeout(() => {
      this.getTableSubjectList();
    }, 500);
  }
  
  getTodaysDay() {
    var nameWeekDays = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
    return nameWeekDays[moment().isoWeekday()-1]; 
  }

  takePicture() {
    this.androidPermissions.checkPermission(this.androidPermissions.PERMISSION.CAMERA).then(
      result => console.log('Has permission?', result.hasPermission),
      err => this.androidPermissions.requestPermission(this.androidPermissions.PERMISSION.CAMERA)
    );
    
    this.androidPermissions.requestPermissions([this.androidPermissions.PERMISSION.CAMERA, this.androidPermissions.PERMISSION.GET_ACCOUNTS]);

    const options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.FILE_URI,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE
    }
    //allowEdit: true
    
    this.camera.getPicture(options).then((imageData) => {
      //base64Image for Browser
      let base64Image = 'data:image/jpeg;base64,' + imageData;
      //Later text: "Description",
      let imageObject = {
        "id": getRandomInt(),
        "subjectID": determineSubjectIDForImage(this.tableStorageService.getTimeTable(), this.folderList),
        "weekDay": this.weekDay,
        "src": imageData,
        "creationDate": new Date().toISOString()
      }
      this.imageStorageService.updateImageTable(imageObject);
      this.getTableSubjectList();
      }, (err) => {
        console.log(err);
      });
  }

  getTableSubjectList() {
    let tableList = [];
    this.timetable = this.tableStorageService.getTimeTable();

    for(const folder of this.timetable.getAllFolders()) {
      tableList.push({
        "id": folder.id,
        "subject": folder.subject,
        "subjectID": folder.subjectID,
        "color": folder.color,
        "count": this.imageStorageService.getImageCountForSubject(folder.subjectID)
      });
    }
    this.folderList = tableList;
  }

  navigateToImageFolder(subjectID, subject) {
    let navigationExtras: NavigationExtras = {
      state: {
        weekDay: this.weekDay,
        subjectFromList: subject,
        id: subjectID,
        subjectList: this.folderList
      }
    };
    if(!this.alertOpened) {
      this.router.navigate(['/image-folder'], navigationExtras);
    }
  }

  async presentAlert(subject: string, subjectID: number) {
    this.alertOpened = true;
    const alertct = await this.alertController.create({
      header: subject,
      message: 'images will be deleted!',
      buttons: [
        {
          text: 'Cancel',
          handler: () => {
            console.log('Cancel');
            this.alertOpened = false;
          }
        },
        {
          text: 'Delete',
          handler: () => {
            if(subject != "Other") {
              //Deletes Folders
              let newFolders = this.timetable.removeFolderbySubjectID(subjectID);
              for(let i = 0; i < newFolders.length; i++){
                if(newFolders[i] != null){
                  this.timetable.addFolder(newFolders[i]);
                }
              }
              this.tableStorageService.updateTimeTable(this.timetable);
              this.getTableSubjectList();
              //Deletes Images
              let newImageList = this.imageStorageService.removeImagesbySubectID(subjectID)
              for (const newImage of newImageList) {
                this.imageStorageService.updateImageTable(newImage);
              }
            } else {
              this.presentToast("Cant´t delete this Folder!");
            }
            this.alertOpened = false;
          }
        }
      ]
    });
    await alertct.present();
  }

  async presentToast(message: string) {
    const toast = await this.toastController.create({
      message: message,
      duration: 2000
    });
    toast.present();
  }
}

function getRandomInt() {
  return Math.floor(Math.random() * Math.floor(99999999));
}

function determineSubjectIDForImage(table, folderList) {
  let returnValue;

  for (const lesson of table.lessons) {
    let timeNow = moment();
    let todayWeekNr = timeNow.isoWeekday();
  // let timeNow = moment({hour: 0, minute: 30});
    
    let end = moment(lesson.codeTimeFrame.toTime, "hhmm");
    let start = moment(lesson.codeTimeFrame.fromTime, "hhmm");

    if(checkDay(todayWeekNr, lesson.weekDay)) {
      
      if(start.hour() > end.hour()) {
        end.add(1, "day");
        // timeNow.add(1, "day");
      }

      if(start.isSameOrBefore(timeNow) && end.isAfter(timeNow)) {
        if(checkLesson(lesson.repeatWeek, table.creationDate , lesson.startingWeek)) {
          if(checkIfFolderExists(folderList, lesson.subjectID)) {
            returnValue = lesson.subjectID;
          }
        }

      }
    }
  }

  if(returnValue == undefined) {
    return 1111111;
  }else{
    return returnValue;
  }
}

function checkDay(timeNow, weekDay) {
  var nameWeekDays = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
  if(nameWeekDays[timeNow-1] == weekDay){
    return true;
  }else{
    console.log("checkDay: " + timeNow + "/" + weekDay + "/" + nameWeekDays[timeNow-1]);
    return false;
  }
}


function checkLesson(fachrythmus: number, creationDate: Date, startingWeek: number) {
    const date = moment();
    // .add(21, "day");
    let weekOfYear = date.isoWeek(); //Kalender Woche
    let creationWeek = moment(creationDate).isoWeek(); //Woche wann StundenPlan kreiert wurde
    let modulo = Math.abs(weekOfYear-(creationWeek + startingWeek)) % fachrythmus;
    
    if(modulo == 0) {
      return true;
    } else {
      return false;
    }
}

function checkIfFolderExists(folderList: any[], subjectID: number) {
  for (const folder of folderList) {
    if(folder.subjectID == subjectID) {
      return true;
    }
  }
  return false;
}