import { Skill } from './../models/skill';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SkillService {

  skillURL = environment.skillURL;

  constructor(private httpClient: HttpClient) { }

  public list(): Observable<Skill[]>{
    return this.httpClient.get<Skill[]>(this.skillURL + 'all');
  }

  public getOne(idSkill: number): Observable<Skill>{
    return this.httpClient.get<Skill>(this.skillURL + `${idSkill}`);
  }

  public getByPerson(idPerson: number): Observable<Skill[]>{
    return this.httpClient.get<Skill[]>(this.skillURL + `person/${idPerson}`);
  }

  public save(skill: Skill, idPerson: number): Observable<any>{
    return this.httpClient.post<any>(this.skillURL + `save/${idPerson}`, skill);
  }

  public update(idSkill: number, skill: Skill, idPerson: number): Observable<any>{
    return this.httpClient.put<any>(this.skillURL + `update/${idPerson}/${idSkill}`, skill);
  }

  public delete(idSkill: number): Observable<any>{
    return this.httpClient.delete<any>(this.skillURL + `delete/${idSkill}`);
  }
}
