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
      if(this.lessons[i] != null){
        if( this.lessons[i].weekDay == weekDay ){
          object.push(this.lessons[i]);
        }
      }
    }
    return object;
  }

  removeSpecificLesson(id: number){
    // console.log(this.lessons);
    let currentLessons = this.lessons.filter(el => el.id != id);
    this.lessons = [];
    return currentLessons;
  }

  getLessonById(id: number){
    console.log(this.lessons);
    return this.lessons.filter(el => el.id == id);
  }

  getSubjectList(){
    let subjectList = [];
    for (const lesson of this.lessons) {
      if(!subjectList.includes(lesson.subject)){
        subjectList.push({
          "subject": lesson.subject,
          "color": lesson.color
        });
      }
    }
    subjectList.push({
      "subject": "Other",
      "color": "primary"
    });
    return subjectList;
  }
}

export interface Lesson {
  id:  number;
  subject: string;
  weekDay: string;
  color: string;
  timeframe: TimeFrame;
  codeTimeFrame:CodeTimeFrame;
}

export interface TimeFrame {
  fromTime: number;
  toTime: number;
}

export interface CodeTimeFrame {
  fromTime: string;
  toTime: string;
}
