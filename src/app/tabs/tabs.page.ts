import { Component, ViewChild } from '@angular/core';
import { Platform, IonTabs } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tabs',
  templateUrl: './tabs.page.html',
  styleUrls: ['./tabs.page.scss'],
})
export class TabsPage {
  @ViewChild("tabs", {read: IonTabs, static: true}) tabRef: IonTabs;
  
  constructor(
    private platform: Platform,
    private router: Router,
  ) 
  {
    //Hardware Back Button (switches to root)
    this.platform.backButton.subscribeWithPriority(10, (processNextHandler) => {
      if(this.tabRef.getSelected() == "settings" || this.tabRef.getSelected() == "home") {
        this.tabRef.select("camera");
      }
      processNextHandler();
    });

    // Hardware Back Button (exits app)
    this.platform.backButton.subscribeWithPriority(-1, () => {
      if(this.tabRef.getSelected() == "camera" && this.router.url != "/image-folder") {
        console.log(this.platform.url());
        console.log(this.router.url);
        navigator['app'].exitApp();
      }
    });
  }
}
