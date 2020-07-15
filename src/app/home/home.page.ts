import { Component } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { ToastController } from '@ionic/angular';
import { ModalAddPage } from '../modal/modal-add/modal-add.page';
import { TableStorageService } from '../service/table-storage.service';
import { SettingsService  } from '../service/settings.service';
import { TimeTable, Lesson } from '../models/timetable';
import { Platform } from '@ionic/angular';
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
  lessonList: Lesson[];
  modalOpen: boolean;


  constructor(
    public modalController: ModalController,
    public tableStorageService: TableStorageService,
    public settingsService: SettingsService,
    public toastController: ToastController,
    private platform: Platform
  ){
    this.todayDay = this.getTodaysDay();
    this.weekDay = this.getTodaysDay();
    this.getTableDay();

    this.tableStorageService.remove.subscribe(() => {
      this.lessonList = [];
      this.timetable = new TimeTable("test");
    });

    //Hardware Back Button (blocks unsaved changes)
    this.platform.backButton.subscribeWithPriority(101, (processNextHandler) => {
      if(this.modalOpen) {
        this.modalController.dismiss({
          'dismissed': true,
          'noChanges': false
        });
      } else {
        processNextHandler();
      }
    });
  }

  getTodaysDay(){
    var nameWeekDays = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
    return nameWeekDays[moment().isoWeekday()-1]; 
  }
 
  async presentModal(array?: any) {
    let modalObject: any;
    //When Changes are made for Lesson
    if(array) {
      modalObject = {
        component: ModalAddPage,
        cssClass: 'my-custom-modal-css',
        componentProps: {
          'weekDay': array.weekDay,
          'subject': array.subject,
          'subjectID': array.subjectID,
          'color': array.color,
          'repeatWeek': array.repeatWeek,
          'startingDate': array.startingDate,
          'fromTime': array.timeFrame.fromTime,
          'toTime': array.timeFrame.toTime,
          'lessonList': this.lessonList,
          'edit': true
        }
      }
    } else {
      //New Lesson 
      modalObject = {
        component: ModalAddPage,
        cssClass: 'my-custom-modal-css',
        componentProps: {
          'lessonList': this.lessonList,
          'edit': false
        }
      }
    }

    if(this.weekDay != "Choose Day!") {
      this.modalOpen = true;
      const modal = await this.modalController.create(modalObject);
      modal.onDidDismiss()
      .then((data) => {
        this.modalOpen = false;
        const dataObject = data['data'];
        if(dataObject.noChanges && array) {
          this.removeSpecificLesson(array.id);
        }
        //Send Data to Storage
        if(dataObject == undefined) {
          return;
        }
        
        if(dataObject.object != null) {
          this.timetable.addLesson(dataObject.object);
          this.timetable.addFolder({
            'id': this.getRandomInt(),
            'subject': dataObject.object.subject,
            'subjectID': dataObject.object.subjectID,
            'color': dataObject.object.color
          });
          this.tableStorageService.updateTimeTable(this.timetable);
          this.getTableDay();
        }
        
      });
      return await modal.present();
    }else{
      this.presentToast("Please Choose Day!");
    }
  }

  getRandomInt() {
    return Math.floor(Math.random() * Math.floor(99999999));
  }

  getTableDay() {
    var nameWeekDays = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
    this.timetable = this.tableStorageService.getTimeTable();
    if (this.timetable == undefined) {
      this.tableStorageService.isReady.subscribe(() => {
        this.timetable = this.tableStorageService.getTimeTable();
        this.lessonList = this.timetable.getAllLessons();
        //Sort LessonList
        let sortedArray = this.lessonList.sort((a, b) => {
          if(nameWeekDays.indexOf(a.weekDay) < nameWeekDays.indexOf(b.weekDay)) {
            return -1;
          }
          if(nameWeekDays.indexOf(a.weekDay) > nameWeekDays.indexOf(b.weekDay)) {
            return 1;
          }
          if(nameWeekDays.indexOf(a.weekDay) == nameWeekDays.indexOf(b.weekDay)) {
            let temp =  moment(a.timeFrame.fromTime).diff(moment(b.timeFrame.fromTime));
            if(temp == 0) {
              return 0;
            }else {
              return temp;
            }
          }
        });
        this.lessonList = sortedArray;
      });
    } else {
      this.lessonList = this.timetable.getAllLessons();
      //Sort LessonList
      let sortedArray = this.lessonList.sort((a, b) => {
        if(nameWeekDays.indexOf(a.weekDay) < nameWeekDays.indexOf(b.weekDay)) {
          return -1;
        }
        if(nameWeekDays.indexOf(a.weekDay) > nameWeekDays.indexOf(b.weekDay)) {
          return 1;
        }
        if(nameWeekDays.indexOf(a.weekDay) == nameWeekDays.indexOf(b.weekDay)) {
          let temp =  moment(a.timeFrame.fromTime).diff(moment(b.timeFrame.fromTime));
          if(temp == 0) {
            return 0;
          }else {
            return temp;
          }
        }
      });
      this.lessonList = sortedArray;
    }
  }

  removeSpecificLesson(id: number) {
    //Delete Lesson from Storage!
    let newLessons = this.timetable.removeSpecificLesson(id);
    for(let i = 0; i < newLessons.length; i++){
      if(newLessons[i] != null){
        this.timetable.addLesson(newLessons[i]);
      }
    }
    
    this.tableStorageService.updateTimeTable(this.timetable);
    this.getTableDay();
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
