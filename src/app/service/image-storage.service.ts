import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';



@Injectable({
  providedIn: 'root'
})
export class ImageStorageService {
  private images: Image[];
  private static readonly IMAGE_TABLE_STORAGE_KEY: string = "images";

  constructor(private storage: Storage) {
    storage.ready().then(() => {
      this.pullFromStorage();
    });
  }

  // toJSON() {
  //   return JSON.stringify(this.images);
  // }

  // getImageSourceById(id: number) {
  //   const filtered = this.images.filter(image => image.id === id);

  //   if (filtered.length < 1) {
  //     throw `no image with id ${id} found`;
  //   }

  //   return filtered;
  // }

  // getListOfImageMetadata() {
  //   let result = [];

  //   for (const image of this.images) {
  //     result.push({
  //       "id": image.id,
  //       "weekDay": image.weekDay,
  //       "creationDate" : image.creationDate
  //     })
  //   }

  //   return result;
  // }

  // addImage(image: Image) {
  //   this.images.push(image);
  //   this.updateImageTable(this.images);
  // }

  // getSpecificImages(weekDay:string){
  //   //Später filter() einbauen.
  //   let object = [];
  //   for (let i = 0; i < this.images.length; i++) {
  //     if(this.images[i] != null){
  //       if( this.images[i].weekDay == weekDay ){
  //         object.push(this.images[i]);
  //       }
  //     }
  //   }
  //   return object;
  // }

  removeSpecificImage(id: number){
    let currentImage = this.images.filter(el => el.id != id);
    this.images = [];
    this.removeFromStorage();
    return currentImage;
  }

  // getLessonById(id: number){
  //   console.log(this.images);
  //   return this.images.filter(el => el.id == id);
  // }

  // getImages(){
  //   return this.images;
  // }

  // getAllImages(){
  //   let allImages = [];
  //   for (const image of this.images) {
  //    allImages.push({
  //      "src": image.src,
  //      "subject": image.subject
  //     });
  //   }
  //   return allImages;
  // }

  //Storage Methodes
  private async pullFromStorage() {
    let currentImagetable = await this.storage.get(ImageStorageService.IMAGE_TABLE_STORAGE_KEY);
    
    if (currentImagetable) {
      this.images = currentImagetable;
    }
    else {
      this.images = [];
    }
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
  }

  async clearStorage(){
    return await this.storage.clear();
  }

  async removeFromStorage(){
    return await this.storage.remove("images");
  }
}

export interface Image {
  id:  number;
  subject:string;
  weekDay: string;
  src: string;
  creationDate: string;
}
