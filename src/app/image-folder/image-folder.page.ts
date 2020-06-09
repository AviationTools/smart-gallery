import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ImageStorageService } from '../service/image-storage.service';
import { ModalController } from '@ionic/angular';
import { SocialSharing } from '@ionic-native/social-sharing/ngx';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-image-folder',
  templateUrl: './image-folder.page.html',
  styleUrls: ['./image-folder.page.scss'],
})
export class ImageFolderPage {
  weekDay: string;
  subject: string;
  subjectId: number;
  imagesList: any[];
  lessonList: any[];
  
  constructor(
    private route: ActivatedRoute, 
    private router: Router,
    public modalController: ModalController,
    private socialSharing: SocialSharing,
    private imageStorageService: ImageStorageService,
    public toastController: ToastController
  ) {
    this.route.queryParams.subscribe(params => {
      let inputObject = this.router.getCurrentNavigation().extras.state;
      this.weekDay = inputObject.weekDay;
      this.subject = inputObject.subjectFromList;
      this.subjectId = inputObject.id;
      this.lessonList = inputObject.subjectList
      
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

  editSpecificLesson(emitObject: any) {
    let id = emitObject[0];
    let subject = emitObject[1];
    let thisImage = this.imageStorageService.getSpecificImage(id);

    let imageObject = {
      "id": id,
      "subject": subject,
      "weekDay": thisImage[0].weekDay,
      "src": thisImage[0].src,
      "creationDate": thisImage[0].creationDate
    }

    this.removeSpecificLesson(id);
    this.imageStorageService.updateImageTable(imageObject);
  }

  shareSpecificLesson(id: number) {
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

  getImagesForSubject(subjectId: number) {
    let win: any = window; //Necessary!
    let imageTable = this.imageStorageService.getImageTable();
    let subjectImageList = [];
    let i = 0;

    for (const images of imageTable) {
      i++;
      // console.log(images.src);
      if(images.subjectID == subjectId) {
        //safeURL for DOM/Android
        let safeURL = win.Ionic.WebView.convertFileSrc(images.src);
        //base64 for Browser
        let base64Image = 'data:image/jpeg;base64,' + images.src;
        subjectImageList.push({
          "src": images.src,
          "safeURL": safeURL,
          "id": images.id,
          "index": i
        });
      }
    }
    this.imagesList = subjectImageList;
    if(subjectImageList.length == 0) {
      this.presentToast("No Images for this Subject found!");
    }
  }

  async presentToast(message: string) {
    const toast = await this.toastController.create({
      message: message,
      duration: 1500
    });
    toast.present();
  }
}
