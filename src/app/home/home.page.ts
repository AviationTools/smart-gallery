import { Component } from '@angular/core';
import { Storage } from '@ionic/storage';

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

  constructor(private storage: Storage) {}

  //For Each 
  // async getEachElement(){
  //   await this.storage.forEach(
  //     element => {
  //       console.log(element)
  //     }
  //   )
  // }

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

  
}
