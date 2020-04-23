import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ImageStorageService } from '../service/image-storage.service';
import { ModalController } from '@ionic/angular';
import { ModalFullscreenPage } from '../modal/modal-fullscreen/modal-fullscreen.page';

@Component({
  selector: 'app-image-folder',
  templateUrl: './image-folder.page.html',
  styleUrls: ['./image-folder.page.scss'],
})
export class ImageFolderPage {
  weekDay:string;
  subject:string;
  imagesList:any[];
  id:number;
  
  constructor(
    private route: ActivatedRoute, 
    private router: Router,
    public modalController: ModalController,
    private imageStorageService: ImageStorageService
  ) {
    this.route.queryParams.subscribe(params => {
      let inputObject = this.router.getCurrentNavigation().extras.state;
      this.weekDay = inputObject.weekDay;
      this.subject = inputObject.subjectFromList;
      
      this.getImagesForSubject(this.subject);
    });
  }

  removeSpecificLesson(id: number) {
    let newImageList = this.imageStorageService.removeSpecificImage(id)
    for (const newImage of newImageList) {
      this.imageStorageService.updateImageTable(newImage);
    }
    this.imagesList = [];
    this.getImagesForSubject(this.subject);
  }

  getImagesForSubject(subject: string){
    let imageTable = this.imageStorageService.getImageTable();
    let subjectImageList = [];

    for (const images of imageTable) {
      if(images.subject == subject) {
        subjectImageList.push({
          "src": images.src,
          "id": images.id
        });
      }
    }
    this.imagesList = subjectImageList;
  }

  async showSpecificLesson(image: string, subject: string) {
    let modalObject: any;
      modalObject = {
        component: ModalFullscreenPage,
        componentProps: {
          'image': image,
          'subject': this.subject
        }
      }
      const modal = await this.modalController.create(modalObject);
      
      modal.onDidDismiss()
      .then((data) => {
        const dataObject = data['data'];
        if(dataObject.object != null){
          console.log(dataObject);
        }
      });
      return await modal.present();

  }
}
