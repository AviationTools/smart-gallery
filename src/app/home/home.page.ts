import { Component } from '@angular/core';
import { PickerController } from '@ionic/angular';
import { ModalController } from '@ionic/angular';
import { ModalAddPage } from '../modal/modal-add/modal-add.page';
import { TableStorageService } from '../service/table-storage.service';
import { TimeTable } from '../timetable/timetable';


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
    public tableStorageService: TableStorageService) {

    this.weekDay = "Choose Day";
  }
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
    
  async presentModal() {
    const modal = await this.modalController.create({
      component: ModalAddPage,
      componentProps: {
        'weekDay': this.weekDay
      }
    });
    modal.onDidDismiss()
      .then((data) => {
        const dataObject = data['data'];
        
        //Send Data to Storage
        this.timetable.addLesson(dataObject.object);
        this.tableStorageService.updateTimeTable(this.timetable);
        this.getTableDay();

    });
    return await modal.present();
  }

  getTableDay() {
    this.timetable = this.tableStorageService.getTimeTable();
    this.lessonList = this.timetable.getSpecificLessons(this.weekDay);
    console.log(this.lessonList);

  }

  clearStorage() {
    this.tableStorageService.clearStorage();
    console.log("Storage Cleared");
  }
  
}
