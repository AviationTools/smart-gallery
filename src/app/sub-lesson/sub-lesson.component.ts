import { Component, ElementRef, ViewChild, Input, Output, EventEmitter } from '@angular/core';
import { Gesture, GestureController } from '@ionic/angular';

@Component({
  selector: 'app-sub-lesson',
  templateUrl: './sub-lesson.component.html',
  styleUrls: ['./sub-lesson.component.scss'],
})
export class SubLessonComponent {
  @Input("lesson") lesson: any[];
  @Input("item") item: any[];
  @Output() presentAlert = new EventEmitter();
  id: number;

  @ViewChild("card", {read: ElementRef, static: false}) cardElement: ElementRef;
  
  constructor(private gestureCtrl: GestureController) { }

  ngAfterViewInit() {
    const gesture: Gesture = this.gestureCtrl.create({
      el: this.cardElement.nativeElement,
      threshold: 0,
      gestureName: 'my-gesture',
      onStart: (ev) => { onStart(ev); },
      onEnd: (ev) => { onEnd(ev); }
    });
    gesture.enable();
    
    let alertOpend = false;
    let timeoutId = null;
    const onStart = (ev: any) => {
      alertOpend = false;
      if (timeoutId) {
        clearTimeout(timeoutId);
      }

      timeoutId = setTimeout(() => {
        this.presentAlert.emit(this.item);
        alertOpend = true;
      }, 500);
    }

    const onEnd = (ev: any) => {
      clearTimeout(timeoutId);
      timeoutId = null;
    }
  }

}
