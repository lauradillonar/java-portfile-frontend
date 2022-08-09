import { PortfileService } from 'src/app/services/portfile.service';
import Swal from 'sweetalert2';
import { Experience } from './../../../models/experience';
import { ExperienceService } from './../../../services/experience.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-edit-experience',
  templateUrl: './edit-experience.component.html',
  styleUrls: ['./edit-experience.component.css']
})
export class EditExperienceComponent implements OnInit {

  experience!: Experience;
  idPerson?: number;
  idExperience?: number;

  myPortfile: any;
  lang: any;
  label:any;

  constructor(
    private activateRoute: ActivatedRoute,
    private router: Router,
    private experienceService: ExperienceService,
    private labels: PortfileService
  ) { }

  ngOnInit(): void {
    this.labels.getData().subscribe(
      data => {
        this.myPortfile = data;
        this.lang = this.myPortfile.es;
        this.label = this.lang.experience.label;
      }
    );

    this.idExperience = this.activateRoute.snapshot.params['idExperience'];
    this.idPerson = this.activateRoute.snapshot.params['idPerson'];

    if (this.idExperience){
      this.experienceService.getOne(this.idExperience).subscribe(
        data => {
          if( data.idPerson != this.idPerson ){
            Swal.fire("Ops...", "No autorizado", "error");
            this.router.navigate(['/']);
          } else {
            this.experience = data;
          }
        },
        err => {
          Swal.fire("Ops...", err.error.message, "error");
          this.router.navigate([`/${this.idPerson}/home`],{fragment: 'experience'});
        }
      );
    }
  }

  onUpdate(): void {
    if(this.experience.idExperience && this.idPerson){
      this.experienceService.update(this.experience.idExperience, this.experience, this.idPerson).subscribe(
        data => {
          Swal.fire("Datos Actualizados", "Listo", "success");
          this.router.navigate([`/${this.idPerson}/home`],{fragment: 'experience'});
        },
        err => {
          Swal.fire("Ops...", err.error.message, "error");
          this.router.navigate([`/${this.idPerson}/home`],{fragment: 'experience'});
        }
      );
    }
  }
}
