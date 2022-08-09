import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Injectable } from '@angular/core';
import { Education } from '../models/education';

@Injectable({
  providedIn: 'root'
})
export class EducationService {

  educationURL = environment.educationURL;

  constructor(private httpClient: HttpClient) { }

  public list(): Observable<Education[]>{
    return this.httpClient.get<Education[]>(this.educationURL + 'all');
  }

  public getOne(idEducation: number): Observable<Education>{
    return this.httpClient.get<Education>(this.educationURL + `${idEducation}`);
  }

  public getByPerson(idPerson: number): Observable<Education[]>{
    return this.httpClient.get<Education[]>(this.educationURL + `person/${idPerson}`);
  }

  public save(education: Education, idPerson: number): Observable<any>{
    return this.httpClient.post<any>(this.educationURL + `save/${idPerson}`, education);
  }

  public update(idEducation: number, education: Education, idPerson: number): Observable<any>{
    return this.httpClient.put<any>(this.educationURL + `update/${idPerson}/${idEducation}`, education);
  }

  public delete(idEducation: number): Observable<any>{
    return this.httpClient.delete<any>(this.educationURL + `delete/${idEducation}`);
  }
}
