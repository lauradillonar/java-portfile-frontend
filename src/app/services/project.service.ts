import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Injectable } from '@angular/core';
import { Project } from '../models/project';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {

  projectURL = environment.projectURL;

  constructor(private httpClient: HttpClient) { }

  public list(): Observable<Project[]>{
    return this.httpClient.get<Project[]>(this.projectURL + 'all');
  }

  public getOne(idProject: number): Observable<Project>{
    return this.httpClient.get<Project>(this.projectURL + `${idProject}`);
  }

  public getByPerson(idPerson: number): Observable<Project[]>{
    return this.httpClient.get<Project[]>(this.projectURL + `person/${idPerson}`);
  }

  public save(project: Project, idPerson: number): Observable<any>{
    return this.httpClient.post<any>(this.projectURL + `save/${idPerson}`, project);
  }

  public update(idProject: number, project: Project, idPerson: number): Observable<any>{
    return this.httpClient.put<any>(this.projectURL + `update/${idPerson}/${idProject}`, project);
  }

  public delete(idProject: number): Observable<any>{
    return this.httpClient.delete<any>(this.projectURL + `delete/${idProject}`);
  }
}
