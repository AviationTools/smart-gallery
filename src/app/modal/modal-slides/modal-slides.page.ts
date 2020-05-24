import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { IonSlides } from '@ionic/angular';


@Component({
  selector: 'app-modal-slides',
  templateUrl: './modal-slides.page.html',
  styleUrls: ['./modal-slides.page.scss'],
})
export class ModalSlidesPage implements OnInit {
  slideOpts = {
    initialSlide: 0,
    speed: 400,
  };
  constructor(public modalCtrl: ModalController) { }


  ngOnInit() {
  }

  dismissModal() {
    // using the injected ModalController this page
    // can "dismiss" itself and optionally pass back data
    this.modalCtrl.dismiss({
      'dismissed': true
    });
  }
}
