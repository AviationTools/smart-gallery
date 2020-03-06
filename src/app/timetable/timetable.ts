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
}

export interface Lesson {
  subject: string;
  weekDay: number;
  timeframe: TimeFrame;
}

export interface TimeFrame {
  fromTime: number;
  toTime: number;
}
