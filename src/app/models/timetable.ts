export class TimeTable {
  private name: string;
  private creationDate: string;
  private lessons: Lesson[];
  private folder: Folder[];

  constructor(name: string, creationDate?: string, lessons?: Lesson[], folder?: Folder[]) {
    this.name = name;
    this.creationDate = creationDate || new Date().toISOString();
    this.lessons = lessons || [];
    this.folder = folder || [];
  }

  toJSON() {
    return {
      "name": this.name,
      "creationDate": this.creationDate,
      "lessons": this.lessons,
      "folder": this.folder
    }
  }

  addLesson(lesson: Lesson) {
    this.lessons.push(lesson);
  }

  getSpecificLessons(weekDay: string) {
    //Später filter() einbauen.
    let object = [];
    for (let i = 0; i < this.lessons.length; i++) {
      if(this.lessons[i] != null){
        if(this.lessons[i].weekDay == weekDay){
          object.push(this.lessons[i]);
        }
      }
    }
    return object;
  }

  getAllLessons() {
    let object = [];
    for (let i = 0; i < this.lessons.length; i++) {
      if(this.lessons[i] != null){
        object.push(this.lessons[i]);
      }
    }
    return object;
  }

  removeSpecificLesson(id: number){
    let currentLessons = this.lessons.filter(el => el.id != id);
    this.lessons = [];
    return currentLessons;
  }

  getLessonById(id: number){
    return this.lessons.filter(el => el.id == id);
  }

  //Folder Methodes
  addFolder(folder: Folder) {
    this.folder.push(folder);
  }

  getAllFolders() {
    let folderObjectCount = [];
    let folderObject = [];
    for (let i = 0; i < this.folder.length; i++) {
      if(!folderObjectCount.includes(this.folder[i].subjectID)) {
        folderObject.push(this.folder[i]);
      }
      folderObjectCount.push(this.folder[i].subjectID);
    }
    folderObject.push({
      "id": 1111111,
      "subject": "Other",
      "subjectID": 1111111,
      "color": "primary"
    });
    return folderObject;
  }

  removeFolderbySubjectID(subjectID: number) {
    let currentFolders= this.folder.filter(el => el.subjectID != subjectID);
    this.folder = [];
    return currentFolders;
  }
}

export interface Lesson {
  id:  number;
  subject: string;
  subjectID: number;
  weekDay: string;
  color: string;
  repeatWeek: number;
  startingWeek: number;
  timeframe: TimeFrame;
  codeTimeFrame: CodeTimeFrame;
}

export interface TimeFrame {
  fromTime: number;
  toTime: number;
}

export interface CodeTimeFrame {
  fromTime: string;
  toTime: string;
}

export interface Folder {
  id: number;
  subject: string;
  subjectID: number;
  color: string;
}
