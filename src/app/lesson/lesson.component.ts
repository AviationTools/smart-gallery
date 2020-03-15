import { Component, OnInit, Input } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { TimeTable } from '../timetable/timetable';

@Component({
  selector: 'app-lesson',
  templateUrl: './lesson.component.html',
  styleUrls: ['./lesson.component.scss'],
})
export class LessonComponent implements OnInit {
  @Input("weekDay") weekDay:string;
  @Input("lessonList") lessonList:any[];
  @Input("item") item:{};
  @Input("id") id:number;
  timeTable:TimeTable;

  constructor(public alertController: AlertController) {}

  ngOnInit() {
    console.log(this.lessonList);
  }

  async presentAlert(event: any) {
    let tempTimeTable = this.timeTable;
    let tempId = this.id;

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
          }
        },
        {
          text: 'Delete',
          handler: () => {
            console.log('Delete');
            tempTimeTable.removeSpecificLesson(tempId);
          }
        }
      ]
    });
    await alertct.present();
  }
}
