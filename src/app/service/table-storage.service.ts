import { Injectable, EventEmitter } from '@angular/core';
import { Storage } from '@ionic/storage';
import { TimeTable } from '../models/timetable';

@Injectable({
  providedIn: 'root'
})
export class TableStorageService {
  private static readonly TIME_TABLE_STORAGE_KEY: string = "timetable";
  public isReady = new EventEmitter();
  public updated = new EventEmitter();
  public remove = new EventEmitter();

  timetable: TimeTable;

  constructor(private storage: Storage) {
    storage.ready().then(() => {
      this.pullFromStorage();
    });
  }
  
  private async pullFromStorage() {
    let timetable = await this.storage.get(TableStorageService.TIME_TABLE_STORAGE_KEY);

    if (timetable) {
      this.timetable = new TimeTable(timetable.name, timetable.creationDate, timetable.lessons, timetable.folder);
    }
    else {
      this.timetable = new TimeTable("test");
    }

    this.isReady.emit();
  }

  private async pushToStorage() {
    await this.storage.set(TableStorageService.TIME_TABLE_STORAGE_KEY, this.timetable.toJSON());
  }


  getTimeTable() : TimeTable{
    return this.timetable;
  }

  async updateTimeTable(newTimeTable: TimeTable) {
    this.timetable = newTimeTable;
    this.pushToStorage();
    this.updated.emit();
  }

  async clearStorage(){
    return await this.storage.clear();
  }

  async removeFromStorage(){
    await this.storage.remove("timetable").then(() => {
      this.remove.emit();
      this.timetable = new TimeTable("test");
    });
  }
  
}
