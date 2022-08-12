import { PortfileService } from './../../../services/portfile.service';
import { ProjectService } from './../../../services/project.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Project } from './../../../models/project';
import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-edit-project',
  templateUrl: './edit-project.component.html',
  styleUrls: ['./edit-project.component.css']
})
export class EditProjectComponent implements OnInit {

  project!: Project;
  idPerson?: number;
  idProject?: number;
  hasProject: boolean = false;

  myPortfile: any;
  lang: any;
  label: any;

  constructor(
    private activateRoute: ActivatedRoute,
    private router: Router,
    private projectService: ProjectService,
    private labels: PortfileService
  ) { }

  ngOnInit(): void {
    this.labels.getData().subscribe(
      data => {
        this.myPortfile = data;
        this.lang = this.myPortfile.es;
        this.label = this.lang.projects.label;
      },
      err => {
        console.log(err);
      }
    );

    this.idProject = this.activateRoute.snapshot.params['idProject'];
    this.idPerson = this.activateRoute.snapshot.params['idPerson'];

    if(this.idProject){
      this.projectService.getOne(this.idProject).subscribe(
        data => {
          if(data.idPerson != this.idPerson){
            Swal.fire("Ops...", "No autorizado", "error");
            this.router.navigate(['/']);
          } else {
            this.project = data;
            this.hasProject = true;
          }
        },
        err => {
          Swal.fire("Ops...", err.error.message, "error");
          this.router.navigate([`/${this.idPerson}/home`], {fragment: 'projects'});
        }
      );
    }
  }

  onUpdate(): void{
    if(this.project.idProject && this.idPerson){
      this.projectService.update(this.project.idProject, this.project, this.idPerson).subscribe(
        data => {
          Swal.fire("Datos Actualizados", "Listo", "success");
          this.router.navigate([`${this.idPerson}/home`], {fragment: 'projects'});
        },
        err => {
          Swal.fire("Ops...", err.error.message, "error");
          this.router.navigate([`${this.idPerson}/home`], {fragment: 'projects'});
        }
      );
    }
  }

}
