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
  @Input() fromTime: string;
  @Input() toTime: string;
  @Input() edit: boolean;
  @Input() lessonList: any[];

  validatorText: boolean;
  validatorTime: boolean;
  pattern: string | RegExp;

  @Input() startingDate: string;
  @Input() repeatWeek: number;
  repeatWeekText: string;
  startingWeekText: string;
  defaultTime: boolean;
  noChanges: boolean;
  minTime: string;
  maxTime: string;
  weekIndex: number;
  fullWeek: boolean;
  

  constructor(
    public modalController: ModalController,
    public settingsService: SettingsService,
    public toastController: ToastController,
    private pickerController: PickerController,
    ) 
    { 
      if(this.repeatWeek == undefined) {
        this.repeatWeek = 1;
      }
      if(this.startingDate == undefined) {
        this.startingDate = moment().toISOString();
      }
      setTimeout(() => {
        this.setRepeatWeekText(this.repeatWeek);
        this.defaultTime = this.settingsService.getSettings().defaultTime;
        this.fullWeek = this.settingsService.getSettings().fullWeek;

        //Default MIN MAX Dates
        this.minTime = moment().format("YYYY-MM-DD");
        this.maxTime = moment().add(2, "years").format("YYYY");

        if(this.edit) {
          this.noChanges = false;
        } else {
          this.noChanges = true;
        }
      }, 500);
    }

  ionViewDidEnter(){
    setTimeout(() => {
      this.fullWeek = this.settingsService.getSettings().fullWeek;
    }, 500);
  }

  ngOnInit() {
    this.validatorText = true;
    this.validatorTime = true;
    this.defaultTime = false;
  }

  dismissModal() {
    this.modalController.dismiss({
      'dismissed': true,
      'noChanges': this.noChanges
    });
  }

  async setWeekDay() {
    this.weekIndex = this.getTodaysIndex();
    if(this.fullWeek) {
      var weekList = [
        {
          text: 'Monday',
          value: "secondary"
        },
        {
          text: 'Tuesday',
          value: "danger"
        },
        {
          text: 'Wednesday',
          value: "warning"
        },
        {
          text: 'Thursday',
          value: "success"
        },
        {
          text: 'Friday',
          value: "medium"
        },
        {
          text: 'Saturday',
          value: "tertiary"
        },
        {
          text: 'Sunday',
          value: "light"
        }
      ]
    } else {
      var weekList = [
        {
          text: 'Monday',
          value: "secondary"
        },
        {
          text: 'Tuesday',
          value: "danger"
        },
        {
          text: 'Wednesday',
          value: "warning"
        },
        {
          text: 'Thursday',
          value: "success"
        },
        {
          text: 'Friday',
          value: "medium"
        }
      ]
    }

    const picker = await this.pickerController.create({
      columns: [
        {
          name: 'weekDayList',
          options: weekList,
          selectedIndex: this.weekIndex
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
            this.weekDay = value.weekDayList.text;
            this.color = value.weekDayList.value;
          }
        }
      ]
    });

    await picker.present();
  }

  getTodaysIndex() {
    var nameWeekDays = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
    for(let i = 0; i < nameWeekDays.length; i++) {
      if(nameWeekDays[i] == this.weekDay) {
        return i;
      }
    }
  }

  setStorage() {
    let returnObject = {
      "dismissed": false,
      "noChanges": !this.noChanges,
      "object": {
        "id": this.getRandomInt(),
        "subject": this.validateText(this.subject),
        "subjectID": this.checkIfSubjectExists(this.subject),
        "weekDay": this.weekDay,
        "color": this.color,
        "repeatWeek": this.repeatWeek,
        "startingDate": this.startingDate,
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

    if(this.weekDay != null && !this.validatorText && !this.validatorTime){
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

  validateText(text: any) {
    if(text){
      this.validatorText = false
      return text.charAt(0).toUpperCase() + text.slice(1);
    }else{
      this.validatorText = true
      this.presentToast("Please enter a Subject!");
    }
  }

  validateTime(time: string) {
    if(time){
      this.validatorTime = false
      return time;
    }else{
      this.validatorTime = true
      this.presentToast("Please pick a start & end time!");
    }
  }

  async presentToast(message: string) {
    const toast = await this.toastController.create({
      message: message,
      duration: 2000
    });
    toast.present();
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

  addDefaultTime() {
    let newTime = moment(this.fromTime);
    newTime.add(45, "minutes");
    this.toTime = newTime.toISOString();
  }
}