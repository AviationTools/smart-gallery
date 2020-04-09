import { Component, OnInit} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-image-folder',
  templateUrl: './image-folder.component.html',
  styleUrls: ['./image-folder.component.scss'],
})
export class ImageFolderComponent implements OnInit {
  
  weekDay:string;
  subject:string;
  imagesList:any[];
  
  constructor(private route: ActivatedRoute, private router: Router) {
    this.route.queryParams.subscribe(params => {
      let inputObject = this.router.getCurrentNavigation().extras.state;
      
      this.weekDay = inputObject.weekDay;
      this.subject = inputObject.subject;

      this.imagesList = inputObject.imageList;
    });
  }

  ngOnInit() {
  }
  
}
