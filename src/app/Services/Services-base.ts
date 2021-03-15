import { Injectable } from "@angular/core";
import { AngularFirestore } from "@angular/fire/firestore";

import { classToPlain, plainToClass } from "class-transformer";

@Injectable({
  providedIn: "root"
})
export class GameService {
  constructor(private firestore: AngularFirestore) {}

  create(record) {
    return this.firestore
      .collection("Game")
      .add(classToPlain(record))
      .catch(err => console.log(err));
  }

  read() {
    return this.firestore.collection("Game").snapshotChanges();
  }

  update(recordID, record) {
    this.firestore.doc("Game/" + recordID).update(record);
  }

  delete(record_id) {
    this.firestore.doc("Game/" + record_id).delete();
  }
}
