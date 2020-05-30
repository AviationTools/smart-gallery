import { Component } from '@angular/core';
import { PickerController } from '@ionic/angular';
import { ModalController } from '@ionic/angular';
import { ToastController } from '@ionic/angular';
import { ModalAddPage } from '../modal/modal-add/modal-add.page';
import { TableStorageService } from '../service/table-storage.service';
import { SettingsService  } from '../service/settings.service';
import { TimeTable } from '../models/timetable';
import * as moment from 'moment';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage{
  
  weekDay: string;
  todayDay: string;
  subject: string;
  fromTime: Date;
  toTime: Date;
  timetable: TimeTable;
  lessonList:any[];
  fullWeek: boolean;
  


  constructor(
    private pickerController: PickerController,
    public modalController: ModalController,
    public tableStorageService: TableStorageService,
    public settingsService: SettingsService,
    public toastController: ToastController
  ){
    this.todayDay = this.getTodaysDay();
    this.weekDay = this.getTodaysDay();
    this.getTableDay();

    this.tableStorageService.remove.subscribe(() => {
      this.lessonList = [];
      this.timetable = new TimeTable("test");
    });

    setTimeout(() => {
      this.fullWeek = this.settingsService.getSettings().fullWeek;
    }, 500);
  }

  ionViewDidEnter(){
    setTimeout(() => {
      this.fullWeek = this.settingsService.getSettings().fullWeek;
    }, 500);
  }

  getTodaysDay(){
    var nameWeekDays = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
    return nameWeekDays[moment().isoWeekday()-1]; 
  }


  
  // ngOnInit(){
  //   this.tableStorageService.initialgetTimeTable();
  // } 

  async setWeekDay() {
    if(this.fullWeek) {
      var weekList = [
        {
          text: 'Monday'
        },
        {
          text: 'Tuesday'
        },
        {
          text: 'Wednesday'
        },
        {
          text: 'Thursday'
        },
        {
          text: 'Friday'
        },
        {
          text: 'Saturday'
        },
        {
          text: 'Sunday'
        }
      ]
    } else {
      var weekList = [
        {
          text: 'Monday'
        },
        {
          text: 'Tuesday'
        },
        {
          text: 'Wednesday'
        },
        {
          text: 'Thursday'
        },
        {
          text: 'Friday'
        }
      ]
    }

    const picker = await this.pickerController.create({
      columns: [
        {
          name: 'weekDayList',
          options: weekList
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
            
            this.getTableDay();
          }
        }
      ]
    });

    await picker.present();
  }
    
  async presentModal(array?: any) {
    let modalObject: any;
    //When Changes are made for Lesson
    if(array) {
      modalObject = {
        component: ModalAddPage,
        cssClass: 'my-custom-modal-css',
        componentProps: {
          'weekDay': this.weekDay,
          'subject': array.subject,
          'fromTime': array.timeFrame.fromTime,
          'toTime': array.timeFrame.toTime,
          'disableCloseBtn': true
        }
      }
      this.removeSpecificLesson(array.id);
    } else {
      //New Lesson 
      modalObject = {
        component: ModalAddPage,
        cssClass: 'my-custom-modal-css',
        componentProps: {
          'weekDay': this.weekDay,
          'disableCloseBtn': false
        }
      }
    }

    if(this.weekDay != "Choose Day!") {
      const modal = await this.modalController.create(modalObject);
      modal.onDidDismiss()
      .then((data) => {
        const dataObject = data['data'];
        //Send Data to Storage
        if(dataObject == undefined) {
          return;
        }
        
        if(dataObject.object != null) {
          this.timetable.addLesson(dataObject.object);
          this.tableStorageService.updateTimeTable(this.timetable);
          this.getTableDay();
        }
        
      });
      return await modal.present();
    }else{
      this.presentToast("Please Choose Day!");
    }
  }

  addToStorage(inputArray: any){
    for(let i = 0; i < inputArray.length; i++){
      if(inputArray[i] != null){
        this.timetable.addLesson(inputArray[i]);
      }
    }
    this.tableStorageService.updateTimeTable(this.timetable);
    this.getTableDay();
  }

  getTableDay() {
    this.timetable = this.tableStorageService.getTimeTable();
    if(this.timetable == undefined){
      this.tableStorageService.isReady.subscribe(() => {
        this.timetable = this.tableStorageService.getTimeTable();
        this.lessonList = this.timetable.getSpecificLessons(this.weekDay);
      });
    }else{
      this.lessonList = this.timetable.getSpecificLessons(this.weekDay);
    }
  }

  removeSpecificLesson(id: number){
    this.addToStorage(this.timetable.removeSpecificLesson(id));
  }
  
  changeCurrentLesson(id: number){
    let currentLesson = this.timetable.getLessonById(id);
    this.presentModal(currentLesson[0]);
  }

  async presentToast(message: string) {
    const toast = await this.toastController.create({
      message: message,
      duration: 2000
    });
    toast.present();
  }
}
