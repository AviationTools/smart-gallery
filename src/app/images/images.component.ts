import { Component, Input, Output, EventEmitter, ElementRef, ViewChild } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { PhotoViewer } from '@ionic-native/photo-viewer/ngx';
import { Gesture, GestureController } from '@ionic/angular';
import { Vibration } from '@ionic-native/vibration/ngx';

@Component({
  selector: 'app-images',
  templateUrl: './images.component.html',
  styleUrls: ['./images.component.scss'],
})
export class ImagesComponent {

  @Input("subject") subject: string;
  @Input("imagesList") imagesList: any[];
  @Input("image") image: string;
  @Input("rawImage") rawImage: string;
  @Input("id") id: number;
  @Input("lessonList") lessonList: any[];
  @Output() removeSpecificImage = new EventEmitter();
  @Output() editSpecificImage = new EventEmitter();

  @ViewChild("img", {read: ElementRef, static: true}) imgElement: ElementRef;
  
  constructor(
    public alertController: AlertController,
    private photoViewer: PhotoViewer,
    private gestureCtrl: GestureController,
    private vibration: Vibration
  ) {}
  
  
  ngAfterViewInit() {
    const gesture: Gesture = this.gestureCtrl.create({
      el: this.imgElement.nativeElement,
      threshold: 0,
      gestureName: 'my-gesture',
      onStart: (ev) => { onStart(ev); },
      onEnd: (ev) => { onEnd(ev); }
    });
    gesture.enable();
    
    let alertOpend = false;
    let timeoutId = null;
    const onStart = (ev: any) => {
      alertOpend = false;
      if (timeoutId) {
        clearTimeout(timeoutId);
      }

      timeoutId = setTimeout(() => {
        // this.vibration.vibrate(500);
        this.presentAlert();
        alertOpend = true;
      }, 1000);
    }

    const onEnd = (ev: any) => {
      clearTimeout(timeoutId);
      timeoutId = null;
      var options = {
        share: true, // default is false
        closeButton: false, // default is true
        copyToReference: true, // default is false
        headers: '',  // If this is not provided, an exception will be triggered
        piccasoOptions: { } // If this is not provided, an exception will be triggered
      };
      if(!alertOpend) {
        this.photoViewer.show(this.rawImage, this.subject, options);
      }
    }
  }

  async presentAlert() {
    let newSubjectID;
    let input = []
    for (const lesson of this.lessonList) {
      if(lesson.subject != this.subject) {
        input.push({
          name: lesson.subject,
          type: 'radio',
          label: lesson.subject,
          value: lesson.subjectID,
          checked: false,
          handler: (el) => {
            newSubjectID = el.value;
          }
        })
      }
      
    }
    
    const alertct = await this.alertController.create({
      header: 'Edit',
      buttons: [
        {
          text: 'Cancel',
          handler: () => {
            console.log('Cancel');
          }
        },
        {
          text: 'Save',
          handler: () => {
            console.log('Save');
            let emitObject = [this.id, newSubjectID]
            if(emitObject[1] != undefined){
              this.editSpecificImage.emit(emitObject);
            }
          }
        },
        {
          text: 'Delete',
          handler: () => {
            console.log('Delete');
            this.removeSpecificImage.emit(this.id);
          }
        }
      ],
      inputs: input
    });
    await alertct.present();
  }
}
