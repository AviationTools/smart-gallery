import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { TimeTable } from '../timetable/timetable';

@Injectable({
  providedIn: 'root'
})
export class TableStorageService {
  private static readonly TIME_TABLE_STORAGE_KEY: string = "timetable";

  timetable: TimeTable;

  constructor(private storage: Storage) {
    storage.ready().then(() => {
      this.pullFromStorage();
    });
  }
  
  private async pullFromStorage() {
    let timetable = await this.storage.get(TableStorageService.TIME_TABLE_STORAGE_KEY);

    if (timetable) {
      this.timetable = new TimeTable(timetable.name, timetable.creationDate, timetable.lessons);
    }
    else {
      this.timetable = new TimeTable("test");
    }
  }

  private async pushToStorage() {
    await this.storage.set(TableStorageService.TIME_TABLE_STORAGE_KEY, this.timetable.toJSON());
  }

  getTimeTable() : TimeTable {
    return this.timetable;
  }

  async updateTimeTable(newTimeTable: TimeTable) {
    this.timetable = newTimeTable;
    this.pushToStorage();
  }

  async clearStorage(){
    return await this.storage.clear();
  }


  // async setStorage(subject:string, fromTime:Date, toTime:Date) {
  //   var array = {
  //     'subject':subject,
  //     'weekDay':this.weekDay,
  //     'timeFrame':{
  //       'fromTime':fromTime,
  //       'toTime':toTime,
  //     }
  //   }
  //   const value = await this.storage.get(this.weekDay);

  //   if (value) {
  //     value.push(array); 
  //     this.storage.set(this.weekDay, value).catch(e => {
  //       console.log("error: " + e);
  //       });
  //   } else {
  //     this.storage.set(this.weekDay, [ array ]).catch(e => {
  //       console.log("error: " + e);
  //       });
  //   }
  //   console.log(array);
  // }
}
