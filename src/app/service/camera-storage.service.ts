import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { ImageTable } from '../models/imagetable';


@Injectable({
  providedIn: 'root'
})
export class CameraStorageService {
  private static readonly IMAGE_TABLE_STORAGE_KEY: string = "images";
  private imageTable: ImageTable;

  constructor(private storage: Storage) { 
    storage.ready().then(() => {
      this.pullFromStorage();
    });
  }

  private async pullFromStorage() {
    let currentImagetable = await this.storage.get(CameraStorageService.IMAGE_TABLE_STORAGE_KEY);

    if (currentImagetable) {
      this.imageTable = new ImageTable(JSON.parse(currentImagetable));
    }
    else {
      this.imageTable = new ImageTable();
    }
  }

  getImageTable() : ImageTable {
    return this.imageTable;
  }

  private async pushToStorage() {
    await this.storage.set(CameraStorageService.IMAGE_TABLE_STORAGE_KEY, this.imageTable.toJSON());
  }

  async updateImageTable(newImageTimeTable: ImageTable) {
    this.imageTable = newImageTimeTable;
    this.pushToStorage();
  }

  async clearStorage(){
    return await this.storage.clear();
  }

  async removeFromStorage(){
    return await this.storage.remove("images");
  }
}
