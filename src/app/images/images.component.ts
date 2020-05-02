import { Component, Input, Output, EventEmitter } from '@angular/core';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-images',
  templateUrl: './images.component.html',
  styleUrls: ['./images.component.scss'],
})
export class ImagesComponent {

  @Input("subject") subject: string;
  @Input("imagesList") imagesList: any[];
  @Input("image") image: string;
  @Input("id") id: number;
  @Input("index") index: number;
  @Output() showCurrentLesson = new EventEmitter();
  
  constructor(
    public alertController: AlertController
  ) {}

  showImage(){
    this.showCurrentLesson.emit({
      "image": this.image, 
      "id": this.id
    });
  }

}
