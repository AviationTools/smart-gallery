import { Component, OnInit, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { TableStorageService } from '../../service/table-storage.service';
// import { EventEmitter } from '@angular/core';

@Component({
  selector: 'app-modal-add',
  templateUrl: './modal-add.page.html',
  styleUrls: ['./modal-add.page.scss'],
})
export class ModalAddPage implements OnInit {

  @Input() weekDay:string;
  @Input() subject:string;
  @Input() fromTime:Date;
  @Input() toTime:Date;
  

  constructor(
    public modalController: ModalController,
    public tableStorageService: TableStorageService) { }

  ngOnInit() {
  }

  dismissModal() {
    this.modalController.dismiss({
      'dismissed': true
    });
  }

  setStorage(){
    if(this.weekDay != null){
      this.modalController.dismiss({
        'dismissed': false,
        "object": {
          "id": this.getRandomInt(),
          "subject":this.subject,
          "weekDay":this.weekDay,
          "timeFrame":{
            "fromTime":this.fromTime,
            "toTime":this.toTime
          }
        }
      });
    }
  }

  setValues(array: any[]){
    console.log(array);
  }
  
  getRandomInt() {
    return Math.floor(Math.random() * Math.floor(99999999));
  }

}
