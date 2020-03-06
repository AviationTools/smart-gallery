import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { TableStorageService } from '../../service/table-storage.service';
import { EventEmitter } from '@angular/core';

@Component({
  selector: 'app-modal-add',
  templateUrl: './modal-add.page.html',
  styleUrls: ['./modal-add.page.scss'],
})
export class ModalAddPage implements OnInit {

  weekDay:string;
  subject:string;
  fromTime:Date;
  toTime:Date;
  array:[];
  

  constructor(
    public modalController: ModalController,
    public tableStorageService: TableStorageService) { }

  ngOnInit() {
  }

  dismissModal() {
    this.modalController.dismiss({
      'dismissed': true,
      "array": "adfsdgw"
    });
  }

  setStorage(){
    this.modalController.dismiss({
      'dismissed': false,
      "array": "adfsdgw"
    });
    // this.tableStorageService.setStorage(this.subject, this.fromTime, this.toTime);
  }

}
