import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { AngularFirestoreCollection, AngularFirestore } from '@angular/fire/compat/firestore';

export interface Contact {
  name: string;
  email: string;
  id: string;
  message: string;
}

@Injectable({
  providedIn: 'root'
})
export class DataService {
  //contacts: Observable<Contact>;
  private contactsCollection: AngularFirestoreCollection<any>;
  
  constructor(private readonly afs: AngularFirestore) {
    this.contactsCollection = afs.collection<Contact>('contactlvd');
  }

  async onSaveContact (contactForm: Contact): Promise<void>{
    return new Promise(async (resolve, reject)=>{
      try {
        const id = this.afs.createId();
        const data = {...contactForm, id};
        const result = this.contactsCollection.doc(id).set(data);
        resolve(result);
      }catch (error: any){
        reject(error.message);
      }
    });
  }
  
}
