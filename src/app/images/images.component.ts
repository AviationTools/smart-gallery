import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-images',
  templateUrl: './images.component.html',
  styleUrls: ['./images.component.scss'],
})
export class ImagesComponent implements OnInit {

  @Input("subject") subject:string;
  @Input("imagesList") imagesList:any[];
  @Input("image") image:{};
  @Input("id") id:number;
  @Output() removingCurrentLesson = new EventEmitter();
  @Output() showCurrentLesson = new EventEmitter();
  
  constructor(
    public alertController: AlertController
  ) {}

  ngOnInit() {}

  async presentAlert(event: any) {

    const alertct = await this.alertController.create({
      header: 'Details',
      subHeader: this.subject,
      buttons: [
        {
          text: 'Cancel',
          handler: () => {
            console.log('Cancel');
          }
        }, 
        {
          text: 'Show',
          handler: () => {
            console.log('Show');
            this.showCurrentLesson.emit(this.image);
          }
        },
        {
          text: 'Delete',
          handler: () => {
            console.log("Delete");
            this.removingCurrentLesson.emit(this.id);
          }
        }
      ]
    });
    await alertct.present();
  }

}
