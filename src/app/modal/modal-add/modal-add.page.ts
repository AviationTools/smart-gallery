import { Component, OnInit, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { TableStorageService } from '../../service/table-storage.service';
import { ToastController } from '@ionic/angular';
import * as moment from 'moment';

@Component({
  selector: 'app-modal-add',
  templateUrl: './modal-add.page.html',
  styleUrls: ['./modal-add.page.scss'],
})
export class ModalAddPage implements OnInit {

  @Input() weekDay:string;
  @Input() subject:string;
  @Input() fromTime:Date;
  @Input() toTime:Date;

  validator: boolean;

  checkedBlue: boolean;
  checkedRed: boolean;
  checkedBlack: boolean;
  checkedGreen: boolean;
  checkedYellow: boolean;
  checkedGrey: boolean;
  checkedPink: boolean;
  checkedOrange: boolean;
  colorPicked: string;
  

  constructor(
    public modalController: ModalController,
    public tableStorageService: TableStorageService,
    public toastController: ToastController
    ) { }

  ngOnInit() {
    this.checkedBlue = false;
    this.checkedRed = false;
    this.checkedBlack = false;
    this.checkedGreen = false;
    this.checkedYellow = false;
    this.checkedGrey = false;
    this.checkedPink = false;
    this.checkedOrange = false;

    this.validator = true;
  }

  dismissModal() {
    this.modalController.dismiss({
      'dismissed': true
    });
  }

  setStorage() {
    let returnObject = {
      'dismissed': false,
      "object": {
        "id": this.getRandomInt(),
        "subject": this.validateText(this.subject),
        "weekDay": this.weekDay,
        "color": this.validateColor(this.colorPicked),
        "timeFrame":{
          "fromTime": this.validateTime(this.fromTime),
          "toTime": this.validateTime(this.toTime)
        },
        "codeTimeFrame":{
          "fromTime": new Date(this.fromTime).getHours() + ":" + new Date(this.fromTime).getMinutes(),
          "toTime": new Date(this.toTime).getHours() +":" + new Date(this.toTime).getMinutes()
        }
      }
    }

    if(this.weekDay != null && this.validator == false){
      this.modalController.dismiss(returnObject);
    }
  }

  setValues(array: any[]) {
    console.log(array);
  }
  
  getRandomInt() {
    return Math.floor(Math.random() * Math.floor(99999999));
  }

  getTodaysDay() {
    var nameWeekDays = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
    return nameWeekDays[moment().isoWeekday()-1]; 
  }

  setLessonColor(button: string) {
    if(button == "checkedBlue") {
      if(this.checkedBlue == true) {
        this.checkedBlue = false;
      }else {
        this.checkedBlue = true;
        //Only One Checked
        this.checkedRed = false;
        this.checkedBlack = false;
        this.checkedGreen = false;
        this.checkedYellow = false;
        this.checkedGrey = false;
        this.checkedPink = false;
        this.checkedOrange = false;
        //Update Color For Lesson
        this.colorPicked = "secondary";
      }
    } else if(button == "checkedRed") {
      if(this.checkedRed == true) {
        this.checkedRed = false;
      }else {
        this.checkedRed = true;
        //Only One Checked
        this.checkedBlue = false;
        this.checkedBlack = false;
        this.checkedGreen = false;
        this.checkedYellow = false;
        this.checkedGrey = false;
        this.checkedPink = false;
        this.checkedOrange = false;
        //Update Color For Lesson
        this.colorPicked = "danger";
      }
    } else if(button == "checkedBlack") {
      if(this.checkedBlack == true) {
        this.checkedBlack = false;
      }else {
        this.checkedBlack = true;
        //Only One Checked
        this.checkedBlue = false;
        this.checkedRed = false;
        this.checkedGreen = false;
        this.checkedYellow = false;
        this.checkedGrey = false;
        this.checkedPink = false;
        this.checkedOrange = false;
        //Update Color For Lesson
        this.colorPicked = "dark";
      }
    } else if(button == "checkedGreen") {
      if(this.checkedGreen == true) {
        this.checkedGreen = false;
      }else {
        this.checkedGreen = true;
        //Only One Checked
        this.checkedBlue = false;
        this.checkedRed = false;
        this.checkedBlack = false;
        this.checkedYellow = false;
        this.checkedGrey = false;
        this.checkedPink = false;
        this.checkedOrange = false;
        //Update Color For Lesson
        this.colorPicked = "success";
      }
    } else if(button == "checkedYellow") {
      if(this.checkedYellow == true) {
        this.checkedYellow = false;
      }else {
        this.checkedYellow = true;
        //Only One Checked
        this.checkedBlue = false;
        this.checkedRed = false;
        this.checkedBlack = false;
        this.checkedGreen = false;
        this.checkedGrey = false;
        this.checkedPink = false;
        this.checkedOrange = false;
        //Update Color For Lesson
        this.colorPicked = "warning";
      }
    } else if(button == "checkedGrey") {
      if(this.checkedGrey == true) {
        this.checkedGrey = false;
      }else {
        this.checkedGrey = true;
        //Only One Checked
        this.checkedBlue = false;
        this.checkedRed = false;
        this.checkedBlack = false;
        this.checkedGreen = false;
        this.checkedYellow = false;
        this.checkedPink = false;
        this.checkedOrange = false;
        //Update Color For Lesson
        this.colorPicked = "medium";
      }
    } else if(button == "checkedPink") {
      if(this.checkedPink == true) {
        this.checkedPink = false;
      }else {
        this.checkedPink = true;
        //Only One Checked
        this.checkedBlue = false;
        this.checkedRed = false;
        this.checkedBlack = false;
        this.checkedGreen = false;
        this.checkedYellow = false;
        this.checkedGrey = false;
        this.checkedOrange = false;
        //Update Color For Lesson
        this.colorPicked = "tertiary";
      }
    } else if(button == "checkedOrange") {
      if(this.checkedOrange == true) {
        this.checkedOrange = false;
      }else {
        this.checkedOrange = true;
        //Only One Checked
        this.checkedBlue = false;
        this.checkedRed = false;
        this.checkedBlack = false;
        this.checkedGreen = false;
        this.checkedYellow = false;
        this.checkedGrey = false;
        this.checkedPink = false;
        //Update Color For Lesson
        this.colorPicked = "light";
      }
    } else{
      console.log("error");
    }
  }

  validateText(text: any){
    if(text){
      this.validator = false
      return text;
    }else{
      this.validator = true
      this.presentToast("Please enter a Subject!");
    }
  }

  validateTime(time: Date){
    if(time){
      this.validator = false
      return time;
    }else{
      this.validator = true
      this.presentToast("Please pick the Time!");
    }
  }

  validateColor(color :string){
    if(color){
      this.validator = false
      return color;
    }else{
      this.validator = true
      this.presentToast("Please choose a Color!");
    }
  }

  async presentToast(message: string) {
    const toast = await this.toastController.create({
      message: message,
      duration: 2000
    });
    toast.present();
  }
}