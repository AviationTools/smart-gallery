import { Component } from '@angular/core';
import { ImageStorageService } from '../service/image-storage.service';
import { TableStorageService } from '../service/table-storage.service';
import { TimeTable } from '../models/timetable';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { Router, NavigationExtras } from '@angular/router';
import { AndroidPermissions } from '@ionic-native/android-permissions/ngx';
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
  lessonList: any[];

  
  constructor(
    public tableStorageService: TableStorageService,
    private imageStorageService: ImageStorageService,
    private androidPermissions: AndroidPermissions,
    private camera: Camera,
    private router: Router
    ) { 
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
        "subject":determineSubjectForImage(this.tableStorageService.getTimeTable()),
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

    for(const lesson of this.timetable.getSubjectList()){
      tableList.push({
        "subject": lesson.subject,
        "id": lesson.id,
        "color": lesson.color,
        "count": this.imageStorageService.getImageCountForSubject(lesson.id)
      });
    }
    this.lessonList = tableList;
  }

  navigateToImageFolder(id, subject) {
    let navigationExtras: NavigationExtras = {
      state: {
        weekDay: this.weekDay,
        subjectFromList: subject,
        id: id,
        subjectList: this.lessonList
      }
    };
    this.router.navigate(['/image-folder'], navigationExtras);
  }

  updateImageSubjects(base64Image) {
    //Not Implimented yet. Reloads every tab click
    let imageObject = {
      "id": getRandomInt(),
      "subject":determineSubjectForImage(this.tableStorageService.getTimeTable()),
      "weekDay": this.weekDay,
      "src": base64Image,
      "creationDate": new Date().toISOString()
    }
    this.imageStorageService.updateImageTable(imageObject);
  }
}

function getRandomInt() {
  return Math.floor(Math.random() * Math.floor(99999999));
}

function determineSubjectForImage(table) {
  let returnValue;

  for (const lesson of table.lessons) {

    let timeNow = moment();
    let todayWeekNr = timeNow.isoWeekday()
  // let timeNow = moment({hour: 0, minute: 30});
    
    let end = moment(lesson.codeTimeFrame.toTime, "hhmm");
    let start = moment(lesson.codeTimeFrame.fromTime, "hhmm");

    if(checkDay(todayWeekNr, lesson.weekDay)) {
      
      if(start.hour() > end.hour()) {
        end.add(1, "day");
        timeNow.add(1, "day");
      }
      
      if(start.isSameOrBefore(timeNow) && end.isAfter(timeNow)) {
        returnValue = lesson.subjectID;
      } 

    }
  }

  if(returnValue == undefined) {
    return "OTHER";
  }else{
    return returnValue;
  }
}

function checkDay(timeNow, weekDay){
  var nameWeekDays = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
  if(nameWeekDays[timeNow-1] == weekDay){
    return true;
  }else{
    console.log("checkDay /" + timeNow + "/" + weekDay + "/" + nameWeekDays[timeNow-1]);
    return false;
  }
}