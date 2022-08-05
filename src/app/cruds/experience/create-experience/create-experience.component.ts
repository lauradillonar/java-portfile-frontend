import { PortfileService } from 'src/app/services/portfile.service';
import { Experience } from './../../../models/experience';
import { Router, ActivatedRoute } from '@angular/router';
import { ExperienceService } from './../../../services/experience.service';
import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-create-experience',
  templateUrl: './create-experience.component.html',
  styleUrls: ['./create-experience.component.css']
})
export class CreateExperienceComponent implements OnInit {

  idPerson!: number;
  title: string = '';
  subtitle: string = '';
  when: string = '';
  where: string = '';
  text?: string = '';
  link1?: string = '';
  url1?: string = '';
  link2?: string = '';
  url2?: string = '';
  link3?: string = '';
  url3?: string = '';

  myPortfile: any;
  lang: any;
  label: any;


  constructor(
    private experienceService: ExperienceService,
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
        this.label = this.lang.experience.label;
      }
    );
  }

  onCreate(): void {
    const experience = new Experience(
      this.idPerson,
      this.title,
      this.subtitle,
      this.when,
      this.where,
      this.text,
      this.link1,
      this.url1,
      this.link2,
      this.url2,
      this.link3,
      this.url3
    );

    this.experienceService.save(experience).subscribe(
      data => {
        Swal.fire("Experiencia Guardada", "Listo", "success");
        this.router.navigate(['/'+this.idPerson+'/home',{fragment: 'experience'}]);
      },
      err => {
        Swal.fire("Ops...", err.error.message, "error");
        this.router.navigate(['/'+this.idPerson+'/home',{fragment: 'experience'}]);
      }
    );
  }

}
