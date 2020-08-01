import { Component, Input, Output, EventEmitter } from '@angular/core';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-lesson',
  templateUrl: './lesson.component.html',
  styleUrls: ['./lesson.component.scss']
})
export class LessonComponent {
  @Input("lessonList") lessonList: any[];
  @Output() removingCurrentLesson = new EventEmitter();
  @Output() changeCurrentLesson = new EventEmitter();

 

  constructor(
    public alertController: AlertController,
  ) {}

  async presentAlert(emitObject: any) {
    console.log(emitObject);
    const alertct = await this.alertController.create({
      header: emitObject.weekDay,
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
            this.changeCurrentLesson.emit(emitObject.id);
          }
        },
        {
          text: 'Delete',
          handler: () => {
            console.log('Delete');
            this.removingCurrentLesson.emit(emitObject.id);
          }
        }
      ]
    });
    await alertct.present();
  }
}
