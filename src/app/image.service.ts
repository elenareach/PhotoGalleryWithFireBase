import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase } from 'angularfire2/database';
import { FirebaseApp } from 'angularfire2';
import 'firebase/storage';
import { GalleryImage } from './models/galleryImage.model';
import { Observable } from 'rxjs/Observable';
import * as firebase from 'firebase/app';

@Injectable()
export class ImageService {

  private uid: string;

  constructor(private afAuth: AngularFireAuth, private db:AngularFireDatabase) {
    this.afAuth.authState.subscribe(auth=>{
      if (auth != undefined && auth!==null){
        this.uid = auth.uid;
      }
    });
   }
 getImages():Observable<GalleryImage[]>{
   return this.db.list('upload');
}
getImage(key: string) {
  return firebase.database().ref('upload/' + key).once('value')
  .then((snap) => snap.val());
}
}
