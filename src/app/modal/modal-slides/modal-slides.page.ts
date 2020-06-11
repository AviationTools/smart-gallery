import { Component, OnInit, ViewChild } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { IonSlides } from '@ionic/angular';


@Component({
  selector: 'app-modal-slides',
  templateUrl: './modal-slides.page.html',
  styleUrls: ['./modal-slides.page.scss'],
})
export class ModalSlidesPage implements OnInit {
 
  @ViewChild(IonSlides, {read: IonSlides, static: true}) slidesElement: IonSlides;
  
  constructor(public modalCtrl: ModalController) { }


  ngOnInit() {
    this.slidesElement.update();
  }

  dismissModal() {
    this.modalCtrl.dismiss({
      'dismissed': true
    });
  }
}
