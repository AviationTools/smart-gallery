import { Component, OnInit, Input, Output, EventEmitter, ElementRef, ViewChild } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { Gesture, GestureController } from '@ionic/angular';
import { Vibration } from '@ionic-native/vibration/ngx';


@Component({
  selector: 'app-lesson',
  templateUrl: './lesson.component.html',
  styleUrls: ['./lesson.component.scss'],
})
export class LessonComponent implements OnInit {
  @Input("weekDay") weekDay: string;
  @Input("lessonList") lessonList: any[];
  @Input("item") item: {};
  @Input("id") id: number;
  @Input("repeatWeek") repeatWeek: number;
  @Input("color") color: string;
  @Input("subject") subject: string;
  @Input("subjectID") subjectID: number;
  @Output() removingCurrentLesson = new EventEmitter();
  @Output() changeCurrentLesson = new EventEmitter();

  @ViewChild("card", {read: ElementRef, static: true}) cardElement: ElementRef;

  constructor(
    public alertController: AlertController,
    private vibration: Vibration,
    private gestureCtrl: GestureController,
    ) {}

  ngOnInit() {
    // console.log(this.lessonList);
  }

  ngAfterViewInit() {
    const gesture: Gesture = this.gestureCtrl.create({
      el: this.cardElement.nativeElement,
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
    }
  }

  async presentAlert() {
    const alertct = await this.alertController.create({
      header: this.weekDay,
      subHeader: 'Configure',
      buttons: [
        {
          text: 'Cancel',
          handler: () => {
            console.log('Cancel');
          }
        }, 
        {
          text: 'Change',
          handler: () => {
            console.log('Change');
            this.changeCurrentLesson.emit(this.id);
          }
        },
        {
          text: 'Delete',
          handler: () => {
            console.log('Delete');
            this.removingCurrentLesson.emit(this.id);
          }
        }
      ]
    });
    await alertct.present();
  }
}
