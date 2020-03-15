export class TimeTable {
  private name: string;
  private creationDate: string;
  private lessons: Lesson[];

  constructor(name: string, creationDate?: string, lessons?: Lesson[]) {
    this.name = name;
    this.creationDate = creationDate || new Date().toISOString();
    this.lessons = lessons || [];
  }

  toJSON() {
    return {
      "name": this.name,
      "creationDate": this.creationDate,
      "lessons": this.lessons
    }
  }

  addLesson(lesson: Lesson) {
    this.lessons.push(lesson);
  }

  getSpecificLessons(weekDay:string){
    //Später filter() einbauen.
    let object = [];
    for (let i = 0; i < this.lessons.length; i++) {
      if( this.lessons[i].weekDay == weekDay ){
        object.push(this.lessons[i]);
      }
    }
    return object;
  }

  removeSpecificLesson(id: number){
    var temp = this.lessons.filter(el => el.id == id);
    console.log(temp);
  }
}

export interface Lesson {
  id:  number,
  subject: string;
  weekDay: string;
  timeframe: TimeFrame;
}

export interface TimeFrame {
  fromTime: number;
  toTime: number;
}
