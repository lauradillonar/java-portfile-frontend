import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Injectable } from '@angular/core';
import { Contact } from '../models/contact';

@Injectable({
  providedIn: 'root'
})
export class ContactService {

  contactURL = environment.contactURL;

  constructor(private httpClient: HttpClient) { }

  public list(): Observable<Contact[]>{
    return this.httpClient.get<Contact[]>(this.contactURL + 'all');
  }

  public getOne(idContact: number): Observable<Contact>{
    return this.httpClient.get<Contact>(this.contactURL + `${idContact}`);
  }

  public getByPerson(idPerson: number): Observable<Contact[]>{
    return this.httpClient.get<Contact[]>(this.contactURL + `person/${idPerson}`);
  }

  public existsByIdPerson(idPerson: number):Observable<Boolean>{
    return this.httpClient.get<Boolean>(this.contactURL + `inbox/${idPerson}`);
  }

  public save(contact: Contact): Observable<any>{
    return this.httpClient.post<any>(this.contactURL + 'save/', contact);
  }

  public delete(idContact: number):Observable<any>{
    return this.httpClient.delete<any>(this.contactURL + `delete/${idContact}`);
  }
}
