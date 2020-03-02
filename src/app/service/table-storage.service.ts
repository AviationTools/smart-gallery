import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';

@Injectable({
  providedIn: 'root'
})
export class TableStorageService {

  weekDay:string;
  subject:string;
  fromTime:Date;
  toTime:Date;
  array:[];

  constructor(private storage: Storage) {}

  async getTableDay(weekDay:string){
    console.log(weekDay);
    const value = await this.storage.get(this.weekDay);
    this.array = value;
    return this.array;
  }

  clearStorage(){
    this.storage.clear().then((element) => {
      return element;
    });
  }

  async setStorage(subject:string, weekDay:string, fromTime:Date, toTime:Date) {
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
        console.log("if");
    } else {
      this.storage.set(this.weekDay, [ array ]).catch(e => {
        console.log("error: " + e);
        });
        console.log("else");
    }
  }
}
