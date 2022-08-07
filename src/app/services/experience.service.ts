import { ExperiencePerson } from './../models/experience-person';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Injectable } from '@angular/core';
import { Experience } from '../models/experience';

@Injectable({
  providedIn: 'root'
})
export class ExperienceService {

  experienceURL = environment.experienceURL;

  constructor(private httpClient: HttpClient) { }

  public list(): Observable<Experience[]>{
    return this.httpClient.get<Experience[]>(this.experienceURL + 'all');
  }

  public getOne(idExperience: number): Observable<Experience>{
    return this.httpClient.get<Experience>(this.experienceURL + `${idExperience}`);
  }

  public getByPerson(idPerson: number): Observable<Experience[]>{
    return this.httpClient.get<Experience[]>(this.experienceURL + `person/${idPerson}`);
  }

  public save(experience: Experience, idPerson: number): Observable<any>{
    return this.httpClient.post<any>(this.experienceURL + `save/${idPerson}`, experience);
  }

  public update(idExperience: number, experience: Experience, idPerson: number): Observable<any>{
    return this.httpClient.put<any>(this.experienceURL + `update/${idPerson}/${idExperience}`, experience);
  }

  public delete(idExperience: number): Observable<any>{
    return this.httpClient.delete<any>(this.experienceURL + `delete/${idExperience}`);
  }

}
