import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { TableStorageService } from '../../service/table-storage.service';

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

  constructor(public modalController: ModalController, public tableStorageService: TableStorageService) { }

  ngOnInit() {
  }

  dismissModal() {
    // using the injected ModalController this page
    // can "dismiss" itself and optionally pass back data
    this.modalController.dismiss({
      'dismissed': true
    });
  }

  setStorage(){
    this.tableStorageService.setStorage(this.subject, this.weekDay, this.fromTime, this.toTime);
  }

  getTableDay(){
    this.tableStorageService.getTableDay(this.weekDay);
  }

  clearStorage(){
    this.tableStorageService.clearStorage();
  }

}
