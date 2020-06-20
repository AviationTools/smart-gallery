import { Component, OnInit, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { SettingsService  } from '../../service/settings.service';
import { ToastController } from '@ionic/angular';
import { PickerController } from '@ionic/angular';
import * as moment from 'moment';

@Component({
  selector: 'app-modal-add',
  templateUrl: './modal-add.page.html',
  styleUrls: ['./modal-add.page.scss'],
})
export class ModalAddPage implements OnInit {

  @Input() weekDay: string;
  @Input() subject: string;
  @Input() subjectID: number;
  @Input() color: string;
  @Input() fromTime:Date;
  @Input() toTime: Date;
  @Input() disableCloseBtn: boolean;
  @Input() lessonList: any[];

  validatorText: boolean;
  validatorTime: boolean;
  validatorColor: boolean;
  pattern: string | RegExp;

  checkedBlue: boolean;
  checkedRed: boolean;
  checkedBlack: boolean;
  checkedGreen: boolean;
  checkedYellow: boolean;
  checkedGrey: boolean;
  checkedPink: boolean;
  checkedOrange: boolean;
  colorPicked: string;

  @Input() startingWeek: number;
  @Input() repeatWeek: number;
  repeatWeekText: string;
  startingWeekText: string;
  defaultTime: boolean;
  

  constructor(
    public modalController: ModalController,
    public settingsService: SettingsService,
    public toastController: ToastController,
    private pickerController: PickerController,
    ) { 
      if(this.repeatWeek == undefined) {
        this.repeatWeek = 1;
      }
      if(this.startingWeek == undefined) {
        this.startingWeek = 0;
      }
        setTimeout(() => {
          this.setRepeatWeekText(this.repeatWeek);
          this.setStartingWeekText(this.startingWeek);
          this.defaultTime = this.settingsService.getSettings().defaultTime;
          this.setColorFromChange(this.color);
        }, 500);
      }

  ngOnInit() {
    this.checkedBlue = false;
    this.checkedRed = false;
    this.checkedBlack = false;
    this.checkedGreen = false;
    this.checkedYellow = false;
    this.checkedGrey = false;
    this.checkedPink = false;
    this.checkedOrange = false;

    this.validatorText = true;
    this.validatorTime = true;
    this.validatorColor = true;

    this.defaultTime = false;
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
        "subjectID": this.checkIfSubjectExists(this.subject),
        "weekDay": this.weekDay,
        "color": this.validateColor(this.colorPicked),
        "repeatWeek": this.repeatWeek,
        "startingWeek": this.startingWeek,
        "timeFrame": {
          "fromTime": this.validateTime(this.fromTime),
          "toTime": this.validateTime(this.toTime)
        },
        "codeTimeFrame": {
          "fromTime": new Date(this.fromTime).getHours() + ":" + new Date(this.fromTime).getMinutes(),
          "toTime": new Date(this.toTime).getHours() + ":" + new Date(this.toTime).getMinutes()
         }
      }
    }

    if(this.weekDay != null && !this.validatorText && !this.validatorTime && !this.validatorColor){
      this.modalController.dismiss(returnObject);
    }
  }

  checkIfSubjectExists(subject: string) {
    let returnID;
    for (const lesson of this.lessonList) {
      if(lesson.subject == subject) {
        returnID = lesson.subjectID;
      }
    }
    if(returnID == undefined) {
      return this.getRandomInt();
    } else {
      return returnID;
    }
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

  validateText(text: any) {
    if(text){
      this.validatorText = false
      return text.charAt(0).toUpperCase() + text.slice(1);
    }else{
      this.validatorText = true
      this.presentToast("Please enter a Subject!");
    }
  }

  validateTime(time: Date) {
    if(time){
      this.validatorTime = false
      return time;
    }else{
      this.validatorTime = true
      this.presentToast("Please pick the Time!");
    }
  }

  validateColor(color :string) {
    if(color){
      this.validatorColor = false
      return color;
    }else{
      this.validatorColor = true
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

  setColorFromChange(color: string) {
    if(color == undefined || color == null) {
      return;
    }
    if(color == "secondary") {
      this.checkedBlue = true;
      this.colorPicked = "secondary";
    }
    if(color == "danger") {
      this.checkedRed = true;
      this.colorPicked = "danger";
    }
    if(color == "dark") {
      this.checkedBlack = true;
      this.colorPicked = "dark";
    }
    if(color == "success") {
      this.checkedGreen = true;
      this.colorPicked = "success";
    }
    if(color == "medium") {
      this.checkedGrey = true;
      this.colorPicked = "medium";
    }
    if(color == "tertiary") {
      this.checkedPink = true;
      this.colorPicked = "tertiary";
    }
    if(color == "light") {
      this.checkedOrange = true;
      this.colorPicked = "light";
    }
  }

  async setWeekCycle() {
    const picker = await this.pickerController.create({
      columns: [
        {
          name: 'weekCycleList',
          options: [
            {
              text: 'every week',
              value: 1
            },
            {
              text: 'every second week',
              value: 2
            },
            {
              text: 'every third week',
              value: 3
            },
            {
              text: 'every fourth week',
              value: 4
            }
          ],
          selectedIndex: this.repeatWeek -1
        }
    ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel'
        },
        {
          text: 'Confirm',
          handler: (value) => {
            this.repeatWeek = value.weekCycleList.value;
            this.repeatWeekText = value.weekCycleList.text;
          }
        }
      ]
    });

    await picker.present();
  }

  async setStartingWeek() {
    const picker = await this.pickerController.create({
      columns: [
        {
          name: 'weekCycleList',
          options: [
            {
              text: 'this week',
              value: 0
            },
            {
              text: 'next week',
              value: 1
            },
            {
              text: 'in two weeks',
              value: 2
            },
            {
              text: 'in three weeks',
              value: 3
            },
            // {
            //   text: 'in four weeks',
            //   value: 4
            // }
          ],
          selectedIndex: this.startingWeek
        }
    ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel'
        },
        {
          text: 'Confirm',
          handler: (value) => {
            this.startingWeek = value.weekCycleList.value;
            this.startingWeekText = value.weekCycleList.text;
          }
        }
      ]
    });

    await picker.present();
  }

  setRepeatWeekText(weekNumber: number) {
    if(weekNumber == 1) {
      this.repeatWeekText = "every week";
    }
    if(weekNumber == 2) {
      this.repeatWeekText = "every second week";
    }
    if(weekNumber == 3) {
      this.repeatWeekText = "every third week";
    }
    if(weekNumber == 4) {
      this.repeatWeekText = "every fourth week";
    }
  }

  setStartingWeekText(startWeek: number) {
    if(startWeek == 0) {
      this.startingWeekText = "this week";
    }
    if(startWeek == 1) {
      this.startingWeekText = "next week";
    }
    if(startWeek == 2) {
      this.startingWeekText = "in two weeks";
    }
    if(startWeek == 3) {
      this.startingWeekText = "in three weeks";
    }
    // if(startWeek == 4) {
    //   this.startingWeekText = "in four weeks";
    // }
  }
}