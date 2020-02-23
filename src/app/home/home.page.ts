import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  subject:string;
  weekDay:string;
  fromTime:string;
  toTime:string;
  constructor() {}
  
  setText(){
    console.log(this.fromTime);
  }
}
