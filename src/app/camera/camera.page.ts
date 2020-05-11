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
export class CameraPage{
  pictureArray: any[];
  clickedImage: string;
  imageTable: any;
  imagesList: any[];
  weekDay: string;
  timetable: TimeTable;
  lessonList: any[];
  pattern: string | RegExp;

  
  constructor(
    public tableStorageService: TableStorageService,
    private imageStorageService: ImageStorageService,
    private androidPermissions: AndroidPermissions,
    private camera: Camera,
    private router: Router
    ) { 
      this.weekDay = this.getTodaysDay();
      this.timetable = this.tableStorageService.getTimeTable();
      setTimeout( () => {
        this.imageTable = this.imageStorageService.getImageTable();
      }, 1000 );
    }
  
  ionViewWillEnter() {
    setTimeout( () => {
      this.getTableSubjectList();
    }, 1000 );
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
        "color": lesson.color,
        "count": this.imageStorageService.getImageCountForSubject(lesson.subject)
      });
    }
    this.lessonList = tableList;
  }

  navigateToImageFolder($event: any) {
    var regex = /(\w+)$/;
    const subjectString = $event.target.innerText;
    let navigationExtras: NavigationExtras = {
      state: {
        weekDay: this.weekDay,
        subjectFromList: regex.exec(subjectString)[0],
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

function determineSubjectForImage(table){
  let timeNow = moment();
  let returnValue;
  // let timeNow = moment({hour: 0, minute: 0});

  for (const lesson of table.lessons) {
    
    // .subtract(1, 'days')
    let end = moment(lesson.codeTimeFrame.toTime, "hhmm");
    let start = moment(lesson.codeTimeFrame.fromTime, "hhmm");

    if(start.hour() >= end.hour()){
      // console.log(start.hour());
    }

    if(checkDay(timeNow.isoWeekday(), lesson.weekDay)) {
      if(start.isSameOrBefore(timeNow) && end.isAfter(timeNow)) {
        returnValue = lesson.subject;
      } else {
        // if(moment(timeNow).isBetween(start, end)){
        //   console.log("worked")
        // }else{
        //   console.log(start)
        //   console.log(timeNow)
        //   console.log(end)
        // }
      }
    }
  }
  if(returnValue == undefined){
    return "Other";
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