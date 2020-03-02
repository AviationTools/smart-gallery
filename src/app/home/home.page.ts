import { Component } from '@angular/core';
import { Storage } from '@ionic/storage';
import { PickerController } from '@ionic/angular';
import { ModalController } from '@ionic/angular';
import { ModalAddPage } from '../modal/modal-add/modal-add.page';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage{
  
  weekDay:string;
  subject:string;
  fromTime:Date;
  toTime:Date;
  array:[];

  constructor(private storage: Storage, private pickerController: PickerController, public modalController: ModalController) {
    this.weekDay = "Choose Day";
  }

  async getTableDay(){
    const value = await this.storage.get(this.weekDay);
    this.array = value;
    console.log(this.array);
  }

  clearStorage(){
    this.storage.clear().then((element) => {
      console.log(element);
    });
  }

  async setStorage() {
    var array = {
      'subject':this.subject,
      'weekDay':this.weekDay,
      'timeFrame':{
        'fromTime':this.fromTime,
        'toTime':this.toTime,
      }
    }
    const value = await this.storage.get(this.weekDay);

    if (value) {
      value.push(array); 
      this.storage.set(this.weekDay, value).catch(e => {
        console.log("error: " + e);
        });
    } else {
      this.storage.set(this.weekDay, [ array ]).catch(e => {
        console.log("error: " + e);
        });
    }
  }

  async setWeekDay(){
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
      component: ModalAddPage
    });
    return await modal.present();
  }
  
}
