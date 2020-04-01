import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { ImageTable } from '../models/imagetable';


@Injectable({
  providedIn: 'root'
})
export class CameraStorageService {
  private static readonly Image_TABLE_STORAGE_KEY: string = "images";
  imageTable:ImageTable;

  constructor(private storage: Storage) { 
    storage.ready().then(() => {
      this.pullFromStorage();
    });
  }

  private async pullFromStorage() {
    let currentImagetable = await this.storage.get(CameraStorageService.Image_TABLE_STORAGE_KEY);

    if (currentImagetable) {
      this.imageTable = new ImageTable(currentImagetable.name, currentImagetable.creationDate, currentImagetable.images);
    }
    else {
      this.imageTable = new ImageTable("test");
    }
  }

  getImageTable() : ImageTable {
    return this.imageTable;
  }

  private async pushToStorage() {
    await this.storage.set(CameraStorageService.Image_TABLE_STORAGE_KEY, this.imageTable.toJSON());
  }

  async updateImageTable(newTimeTable: ImageTable) {
    this.imageTable = newTimeTable;
    this.pushToStorage();
  }

  async clearStorage(){
    return await this.storage.clear();
  }

  async removeFromStorage(){
    return await this.storage.remove("images");
  }
}
