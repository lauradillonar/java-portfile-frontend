import Swal from 'sweetalert2';
import { Education } from './../../../models/education';
import { PortfileService } from 'src/app/services/portfile.service';
import { ActivatedRoute, Router } from '@angular/router';
import { EducationService } from './../../../services/education.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-create-education',
  templateUrl: './create-education.component.html',
  styleUrls: ['./create-education.component.css']
})
export class CreateEducationComponent implements OnInit {

  idPerson!: number;
  title: string = '';
  when: string = '';
  subtitle: string = '';
  text1: string = '';
  link: string = '';
  url: string = '';
  text2: string = '';
  viewmore: string = '';

  myPortfile: any;
  lang: any;
  label: any;

  constructor(
    private educationService: EducationService,
    private activateRoute: ActivatedRoute,
    private router: Router,
    private labels: PortfileService
  ) { }

  ngOnInit(): void {
    this.idPerson = this.activateRoute.snapshot.params['idPerson'];

    this.labels.getData().subscribe(
      data => {
        this.myPortfile = data;
        this.lang = this.myPortfile.es;
        this.label = this.lang.education.label;
      }
    );
  }

  onCreate(): void {
    const education = new Education(
      this.idPerson,
      this.title,
      this.when,
      this.subtitle,
      this.text1,
      this.link,
      this.url, 
      this.text2,
      this.viewmore
    );

    this.educationService.save(education, this.idPerson).subscribe(
      data => {
        Swal.fire("Datos de educación guardados", "Listo", "success");
        this.router.navigate(['/'+this.idPerson+'/home',{fragment: 'education'}]);
      },
      err => {
        Swal.fire("Ops...", err.error.message, "error");
        this.router.navigate(['/'+this.idPerson+'/home',{fragment: 'education'}]);
      }
    );
  }

}
