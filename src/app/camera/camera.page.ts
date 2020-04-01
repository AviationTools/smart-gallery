import { Component, OnInit } from '@angular/core';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { CameraStorageService } from '../service/camera-storage.service';
import { ImageTable } from '../models/imagetable';
import { TableStorageService } from '../service/table-storage.service';
import { TimeTable } from '../models/timetable';

@Component({
  selector: 'app-camera',
  templateUrl: './camera.page.html',
  styleUrls: ['./camera.page.scss'],
})
export class CameraPage implements OnInit {
  pictureArray: any[];
  clickedImage: string;
  imageTable: ImageTable;
  imagesList:any[];
  weekDay: string;
  timetable: TimeTable;
  lessonList:any[];
  
  constructor(
    private camera: Camera,
    public tableStorageService: TableStorageService,
    private cameraStorageService: CameraStorageService
    ) { }

  ngOnInit() {
  }

  takePicture(){
    const options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.FILE_URI,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE
    }
    
    this.camera.getPicture(options).then((imageData) => {

     let base64Image = 'data:image/jpeg;base64,' + imageData;

     //Later text: "Description",
     let imageObject = {
       "src": base64Image,
       "id": this.getRandomInt(),
     }

    }, (err) => {
      console.log(err);
    });
  }

  async getImageForSpecificDay() {
    this.imageTable = this.cameraStorageService.getImageTable();
    this.imagesList = this.imageTable.getSpecificImages(this.weekDay);
  }

  async getTableDay() {
    this.timetable = this.tableStorageService.getTimeTable();
    this.lessonList = this.timetable.getSpecificLessons(this.weekDay);
  }

  getRandomInt() {
    return Math.floor(Math.random() * Math.floor(99999999));
  }

  // openFilePicker(selection) {

  //   var srcType = Camera.PictureSourceType.SAVEDPHOTOALBUM;
  //   var options = setOptions(srcType);
  //   var func = createNewFileEntry;

  //   navigator.camera.getPicture(function cameraSuccess(imageUri) {

  //       // Do something

  //   }, function cameraError(error) {
  //       console.debug("Unable to obtain picture: " + error, "app");

  //   }, options);
  // }
}
