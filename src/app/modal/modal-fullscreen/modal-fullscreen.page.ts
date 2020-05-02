import { Component } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { ActionSheetController } from '@ionic/angular';

@Component({
  selector: 'app-modal-fullscreen',
  templateUrl: './modal-fullscreen.page.html',
  styleUrls: ['./modal-fullscreen.page.scss'],
})
export class ModalFullscreenPage {
  
  subject: string;
  image: string;
  id: number;
  
  constructor(
    public modalController: ModalController,
    public actionSheetController: ActionSheetController
  ) { }

  dismissModal() {
    this.modalController.dismiss({
      'dismissed': true
    });
  }

  settings(action: string) {
    if(action == "delete"){
      this.modalController.dismiss({
        'dismissed': true,
        'action': action,
        'id': this.id
      });
    }
  }

  async presentActionSheet() {
    const actionSheet = await this.actionSheetController.create({
      header: 'Settings',
      buttons: [{
        text: 'Delete',
        role: 'destructive',
        icon: 'trash',
        handler: () => {
          this.settings("delete");
        }
      }, {
        text: 'Share',
        icon: 'share',
        handler: () => {
          this.settings("share");
        }
      }, {
        text: 'Cancel',
        icon: 'close',
        role: 'cancel',
        handler: () => {
          console.log('Cancel clicked');
        }
      }]
    });
    await actionSheet.present();
  }

}
