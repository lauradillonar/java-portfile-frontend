import Swal from 'sweetalert2';
import { PortfileService } from './../../../services/portfile.service';
import { EducationService } from './../../../services/education.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Education } from './../../../models/education';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-edit-education',
  templateUrl: './edit-education.component.html',
  styleUrls: ['./edit-education.component.css']
})
export class EditEducationComponent implements OnInit {

  education!: Education;
  idPerson?: number;
  idEducation?: number;

  myPortfile: any;
  lang: any;
  label: any;

  constructor(
    private activateRoute: ActivatedRoute,
    private router: Router,
    private educationService: EducationService,
    private labels: PortfileService
  ) { }

  ngOnInit(): void {
    this.labels.getData().subscribe(
      data => {
        this.myPortfile = data;
        this.lang = this.myPortfile.es;
        this.lang = this.lang.education.label;
      }
    );

    this.idEducation = this.activateRoute.snapshot.params['idEducation'];
    this.idPerson = this.activateRoute.snapshot.params['idPerson'];

    if (this.idEducation){
      this.educationService.getOne(this.idEducation).subscribe(
        data => {
          if(data.idPerson != this.idPerson){
            Swal.fire("Ops...", "No autorizado", "error");
            this.router.navigate(['/']);
          } else {
            this.education = data;
          }
        },
        err => {
          Swal.fire("Ops...", err.error.message, "error");
          this.router.navigate(['/'+this.idPerson+'/homme',{fragment: 'education'}]);
        }
      );
    }
  }

  onUpdate(): void {
    if(this.education.idEducation && this.idPerson){
      this.educationService.update(this.education.idEducation, this.education, this.idPerson).subscribe(
        data => {
          Swal.fire("Datos Actualizados", "Listo", "success");
          this.router.navigate(['/'+this.idPerson+'/home', {fragment: 'education'}]);
        },
        err => {
          Swal.fire("Ops...", err.error.message, "error");
          this.router.navigate(['/'+this.idPerson+'/home', {fragment: 'education'}]);
        }
      );
    }
  }

}
