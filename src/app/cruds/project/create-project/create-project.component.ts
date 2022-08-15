import { Project } from './../../../models/project';
import { PortfileService } from 'src/app/services/portfile.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ProjectService } from './../../../services/project.service';
import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-create-project',
  templateUrl: './create-project.component.html',
  styleUrls: ['./create-project.component.css']
})
export class CreateProjectComponent implements OnInit {

  idPerson!: number;
  title: string = '';
  fontawesome: string = '';
  letter: string = '';
  text: string = '';
  viewmore: string = '';

  myPortfile: any;
  lang: any;
  label: any;

  constructor(
    private projectService: ProjectService,
    private activateRouter: ActivatedRoute,
    private router: Router,
    private labels: PortfileService
  ) { }

  ngOnInit(): void {
    this.idPerson = this.activateRouter.snapshot.params['idPerson'];

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
  }

  onCreate(): void {
    const project = new Project(
      this.idPerson,
      this.title,
      this.fontawesome,
      this.letter,
      this.text,
      this.viewmore
    );

    this.projectService.save(project, this.idPerson).subscribe(
      data => {
        Swal.fire("Proyecto guardado", "Listo", "success");
        this.router.navigate([`/${this.idPerson}/home`]);
      }, 
      err => {
        Swal.fire("Ops...", err.error.message, "error");
        this.router.navigate([`/${this.idPerson}/home`]);
      }
    );
  }
}
