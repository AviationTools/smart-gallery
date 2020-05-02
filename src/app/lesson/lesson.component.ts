import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { AlertController } from '@ionic/angular';

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
  @Input("color") color: string;
  @Output() removingCurrentLesson = new EventEmitter();
  @Output() changeCurrentLesson = new EventEmitter();

  constructor(public alertController: AlertController) {}

  ngOnInit() {
    // console.log(this.lessonList);
  }

  async presentAlert(event: any) {
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
