import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ImageStorageService } from '../service/image-storage.service';
import { ModalController } from '@ionic/angular';
import { SocialSharing } from '@ionic-native/social-sharing/ngx';

@Component({
  selector: 'app-image-folder',
  templateUrl: './image-folder.page.html',
  styleUrls: ['./image-folder.page.scss'],
})
export class ImageFolderPage {
  weekDay: string;
  subject: string;
  subjectId: string;
  imageAvailable: boolean;
  imagesList: any[];
  
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
      this.subjectId = inputObject.id;
      
      this.getImagesForSubject(this.subjectId);
    });
  }

  removeSpecificLesson(id: number) {
    let newImageList = this.imageStorageService.removeSpecificImage(id)
    for (const newImage of newImageList) {
      this.imageStorageService.updateImageTable(newImage);
    }
    this.imagesList = [];
    this.getImagesForSubject(this.subjectId);
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

  getImagesForSubject(subjectId: string) {
    let win: any = window; //Necessary!
    let imageTable = this.imageStorageService.getImageTable();
    let subjectImageList = [];
    let i = 0;

    for (const images of imageTable) {
      i++;
      // console.log(images.src);
      if(images.subject == subjectId) {
        //safeURL for DOM/Android
        let safeURL = win.Ionic.WebView.convertFileSrc(images.src);
        subjectImageList.push({
          "src": images.src,
          "safeURL": safeURL,
          "id": images.id,
          "index": i
        });
      }
    }
    
    if(subjectImageList.length >= 1) {
      this.imagesList = subjectImageList;
      this.imageAvailable = true;
    } else {
      this.imageAvailable = false;
    }
  }
}
