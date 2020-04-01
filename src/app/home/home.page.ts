import { Component } from '@angular/core';
import { PickerController } from '@ionic/angular';
import { ModalController } from '@ionic/angular';
import { ToastController } from '@ionic/angular';
import { ModalAddPage } from '../modal/modal-add/modal-add.page';
import { TableStorageService } from '../service/table-storage.service';
import { TimeTable } from '../models/timetable';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage{
  
  weekDay: string;
  subject: string;
  fromTime: Date;
  toTime: Date;
  timetable: TimeTable;
  lessonList:any[];
  


  constructor(
    private pickerController: PickerController,
    public modalController: ModalController,
    public tableStorageService: TableStorageService,
    public toastController: ToastController
  ){
    this.weekDay = "Choose Day!";
  }
  
  // ngOnInit(){
  //   this.getTableDay();
  // } 

  async setWeekDay() {
    const picker = await this.pickerController.create({
      columns: [
        {
          name: 'weekDayList',
          options: [
            {
              text: 'Monday',
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
    //When Changes are made
    if(array){
      modalObject = {
        component: ModalAddPage,
        componentProps: {
          'weekDay': this.weekDay,
          'subject': array.subject,
          'fromTime': array.timeFrame.fromTime,
          'toTime': array.timeFrame.toTime,
        }
      }
    this.removeSpecificLesson(array.id);
    }else{
      modalObject = {
        component: ModalAddPage,
        componentProps: {
          'weekDay': this.weekDay
        }
      }
    }

    if(this.weekDay != "Choose Day!"){
      const modal = await this.modalController.create(modalObject);
      modal.onDidDismiss()
      .then((data) => {
        const dataObject = data['data'];
        //Send Data to Storage
        //TODO: When Changes Clicked but cancelled !
        if(dataObject.object != null){
          console.log(this.timetable);
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

  async getTableDay() {
    this.timetable = this.tableStorageService.getTimeTable();
    this.lessonList = this.timetable.getSpecificLessons(this.weekDay);
  }

  clearStorage() {
    this.tableStorageService.clearStorage();
    console.log("Storage Cleared");
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
