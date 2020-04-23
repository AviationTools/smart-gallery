import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-modal-fullscreen',
  templateUrl: './modal-fullscreen.page.html',
  styleUrls: ['./modal-fullscreen.page.scss'],
})
export class ModalFullscreenPage implements OnInit {
  
  image: string;
  subject: string;

  constructor(public modalController: ModalController) { }

  ngOnInit() {
  }

  dismissModal() {
    this.modalController.dismiss({
      'dismissed': true
    });
  }

}
