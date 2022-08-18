import { Person } from 'src/app/models/person';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class InfoService {

  private _idSelected = new Subject<number>();
  private _personSelectd = new Subject<Person>();

  idSelected$ = this._idSelected.asObservable();
  personSelected$ = this._personSelectd.asObservable();

  constructor() { }

  sendId(id: number){
    this._idSelected.next(id);
  }

  sendPerson(person: Person){
    this._personSelectd.next(person);
  }
}
