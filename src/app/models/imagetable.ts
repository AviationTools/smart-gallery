export interface Image {
  id:  number;
  subjectID: number;
  weekDay: string;
  src: string;
  creationDate: string;
}

export class ImageTable {
    private images: Image[];
  
    constructor(images?: Image[]) {
      this.images = images || [];
    }
  
    toJSON() {
      return JSON.stringify(this.images);
    }

    getImageSourceById(id: number) {
      const filtered = this.images.filter(image => image.id === id);

      if (filtered.length < 1) {
        throw `no image with id ${id} found`;
      }

      return filtered;
    }

    getListOfImageMetadata() {
      let result = [];

      for (const image of this.images) {
        result.push({
          "id": image.id,
          "weekDay": image.weekDay,
          "creationDate" : image.creationDate
        })
      }

      return result;
    }
  
    addImage(image: Image) {
      console.log(this.images);
      this.images.push(image);
    }
  
    getSpecificImages(weekDay:string) {
      //Später filter() einbauen.
      let object = [];
      for (let i = 0; i < this.images.length; i++) {
        if(this.images[i] != null){
          if( this.images[i].weekDay == weekDay ){
            object.push(this.images[i]);
          }
        }
      }
      return object;
    }
  
    removeSpecificImage(id: number) {
      // console.log(this.lessons);
      let currentImage = this.images.filter(el => el.id != id);
      this.images = [];
      return currentImage;
    }
  
    getLessonById(id: number) {
      console.log(this.images);
      return this.images.filter(el => el.id == id);
    }

    getImages() {
      return this.images;
    }

    getAllImages() {
      let allImages = [];
      for (const image of this.images) {
       allImages.push({
         "src": image.src,
         "subjectID": image.subjectID
        });
      }
      return allImages;
    }
  }
  
  