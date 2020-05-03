import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ImageStorageService } from '../service/image-storage.service';
import { ModalController } from '@ionic/angular';
import { ModalFullscreenPage } from '../modal/modal-fullscreen/modal-fullscreen.page';
import { SocialSharing } from '@ionic-native/social-sharing/ngx';

@Component({
  selector: 'app-image-folder',
  templateUrl: './image-folder.page.html',
  styleUrls: ['./image-folder.page.scss'],
})
export class ImageFolderPage {
  weekDay:string;
  subject:string;
  imagesList:any[];
  
  constructor(
    private route: ActivatedRoute, 
    private router: Router,
    public modalController: ModalController,
    private socialSharing: SocialSharing,
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

  shareSpecificLesson(id: number){
    // Check if sharing via email is supported
    this.socialSharing.canShareViaEmail().then(() => {
      // Sharing via email is possible
    }).catch(() => {
      // Sharing via email is not possible
    });

    // Share via email
    this.socialSharing.shareViaEmail('Body', 'Subject', ['recipient@example.org']).then(() => {
      // Success!
    }).catch(() => {
      // Error!
    });
  }

  getImagesForSubject(subject: string) {
    let imageTable = this.imageStorageService.getImageTable();
    let subjectImageList = [];
    let i = 0;

    for (const images of imageTable) {
      i++;
      // console.log(images.src);
      if(images.subject == subject) {
        subjectImageList.push({
          "src": images.src,
          "id": images.id,
          "index": i
        });
      }
    }
    this.imagesList = subjectImageList;
  }

  async showSpecificLesson(input: any) {
    let modalObject: any;
      modalObject = {
        component: ModalFullscreenPage,
        componentProps: {
          'subject': this.subject,
          'image': input.image,
          'id': input.id
        }
      }
      const modal = await this.modalController.create(modalObject);
      
      modal.onDidDismiss()
      .then((data) => {
        const dataObject = data['data'];
        if(dataObject.action == "delete"){
          this.removeSpecificLesson(dataObject.id);
        }
        if(dataObject.action == "share"){
          this.shareSpecificLesson(dataObject.id);
        }
      });
      return await modal.present();

  }
}
