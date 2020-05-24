import { Injectable, EventEmitter } from '@angular/core';
import { Storage } from '@ionic/storage';



@Injectable({
  providedIn: 'root'
})
export class ImageStorageService {
  private images: Image[];
  public isReady = new EventEmitter();
  public updated = new EventEmitter();
  private static readonly IMAGE_TABLE_STORAGE_KEY: string = "images";

  constructor(private storage: Storage) {
    storage.ready().then(() => {
      this.pullFromStorage();
    });
  }
  
  //Image Methodes
  getImageCountForSubject(subject: string){
    let count = 0;
    for (const image of this.images) {
      if(image.subject == subject){
        count++;
      }
    }
    return count;
  }

  removeSpecificImage(id: number){
    let currentImage = this.images.filter(el => el.id != id);
    this.images = [];
    this.removeFromStorage();
    return currentImage;
  }

  getSpecificImage(id: number){
    return this.images.filter(el => el.id == id);
  }

  //Storage Methodes
  private async pullFromStorage() {
    let currentImagetable = await this.storage.get(ImageStorageService.IMAGE_TABLE_STORAGE_KEY);
    
    if (currentImagetable) {
      this.images = currentImagetable;
    }
    else {
      this.images = [];
    }
    this.isReady.emit();
  }

  getImageTable() {
    return this.images;
  }

  private async pushToStorage() {
    await this.storage.set(ImageStorageService.IMAGE_TABLE_STORAGE_KEY, this.images);
  }

  async updateImageTable(newImageTimeTable) {
    this.images.push(newImageTimeTable);
    this.pushToStorage();
    this.updated.emit();
  }

  async clearStorage() {
    return await this.storage.clear();
  }

  async removeFromStorage() {
    await this.storage.remove("images");
    this.updated.emit();
  }

  async removeAllFromStorage() {
    await this.storage.remove("images");
    this.images = [];
    this.updated.emit();
  }
}

export interface Image {
  id:  number;
  subject:string;
  weekDay: string;
  src: string;
  creationDate: string;
}
