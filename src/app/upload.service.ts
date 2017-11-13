import { Injectable } from '@angular/core';
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabase } from 'angularfire2/database';
import { Upload } from './models/upload.module';
import {GalleryImage} from './models/galleryImage.model';
import * as firebase from 'firebase';

@Injectable()
export class UploadService {

  private basePath = '/upload';

  constructor (private ngFire: AngularFireModule, private db: AngularFireDatabase){}
   uploadFile(upload: Upload){
     const storageRef = firebase.storage().ref();
     const uploadTask = storageRef.child(`${this.basePath}/${upload.file.name}`)
      .put(upload.file);

    uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED,
    
      (snapshot) =>{
        upload.progress = (uploadTask.snapshot.bytesTransferred/uploadTask.snapshot.totalBytes) * 100;
      },
      (error) =>{
        console.log(error);
      },
      (): any => {
        upload.url = uploadTask.snapshot.downloadURL;
        upload.name = upload.file.name;
        this.saveFileData(upload);
      }
    );
   }
   private saveFileData(upload: Upload){
     this.db.list(`${this.basePath}/`).push(upload);
     
   }

}
