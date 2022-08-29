import { JwtDto } from './../models/jwt-dto';
import { LoginUser } from './../models/login-user';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from './../../environments/environment';
import { Injectable } from '@angular/core';
import { Person } from '../models/person';

@Injectable({
  providedIn: 'root'
})
export class PersonService {

  personURL = environment.personURL;

  constructor(private httpClient: HttpClient) { }

  public list(): Observable<Person[]>{
    return this.httpClient.get<Person[]>(this.personURL + 'all');
  }

  public home(idPerson: number): Observable<Person>{
    return this.httpClient.get<Person>(this.personURL + `${idPerson}`);
  }

  public getId(user: String):Observable<number>{
    return this.httpClient.get<number>(this.personURL + `user/${user}`);
  }

  public login (loginUser: LoginUser): Observable<JwtDto>{
    return this.httpClient.post<JwtDto>(this.personURL + `login`, loginUser);
  }

  public save(person: Person): Observable<any>{
    return this.httpClient.post<any>(this.personURL + 'save', person);
  }

  public update(idPerson: number, person: Person): Observable<any>{
    return this.httpClient.put<any>(this.personURL + `update/${idPerson}`, person);
  }

  public delete(idPerson: number): Observable<any>{
    return this.httpClient.delete<any>(this.personURL + `delete/${idPerson}`);
  }
}
