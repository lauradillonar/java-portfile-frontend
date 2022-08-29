import { TokenService } from './../../services/token.service';
import { PersonService } from './../../services/person.service';
import { Project } from './../../models/project';
import { Router } from '@angular/router';
import { ProjectService } from './../../services/project.service';
import { Component, Input, OnInit } from '@angular/core';
import { PortfileService } from 'src/app/services/portfile.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.css']
})
export class ProjectComponent implements OnInit {

  constructor(
    private labels: PortfileService,
    private projectService: ProjectService,
    private router: Router,
    private personService: PersonService,
    private tokenService: TokenService) { }

  myPortfile:any;
  lang: any;
  label: any = [];
  @Input() idPerson?: number;
  projects: Project[] = [];
  hasProject: boolean = false;
  textareas!: NodeList;
  isLogged: boolean = false;
  userName: string = '';
  idPersonLogged?: number;
  isPersonLogged: boolean = false;
  

  ngOnInit(): void {
    if(this.tokenService.getToken()){
      this.isLogged = true;
      this.userName = this.tokenService.getUserName();
      if(this.userName){
        this.personService.getId(this.userName).subscribe(
          id => {
            this.idPersonLogged = id;
            this.isPersonLogged = true;
            console.log(this.idPersonLogged);
          }
        );  
      }
    }else{
      this.isLogged = false;
      this.userName = '';
    }


    this.labels.getData().subscribe(data =>{
      this.myPortfile=data;
      this.lang=this.myPortfile.es;
      this.label= this.lang.projects.label;
    },
    err => {
      console.log(err);
    });

    this.listProject();
  }

  ngAfterViewChecked(): void {
    this.textareas = document.querySelectorAll(".text");
    this.textareas.forEach(
      (text:any) => {
        text.style.height =text.scrollHeight+'px';
    });
  }

  listProject(): void{
    if (this.idPerson){
      this.projectService.getByPerson(this.idPerson).subscribe(
        data => {
          this.projects = data;
          this.hasProject = true;
        },
        err => {
          console.log(err);
        }
      );
    }
  }

  deleteProject(idProject?: number): void {
    if(idProject){
      this.projectService.delete(idProject).subscribe(
        data => {
          Swal.fire("Proyecto borrado", "Listo", "success");
          this.listProject();
          this.router.navigate([`/${this.idPerson}/home`]);
        },
        err => {
           Swal.fire("Ops...", err.error.message, "error");
        }
      );
    }
  }
}
