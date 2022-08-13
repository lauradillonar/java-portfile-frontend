import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { Experience } from './../../models/experience';
import { ExperienceService } from './../../services/experience.service';
import { Component, Input, OnInit } from '@angular/core';
import { PortfileService } from 'src/app/services/portfile.service';

@Component({
  selector: 'app-experience',
  templateUrl: './experience.component.html',
  styleUrls: ['./experience.component.css']
})
export class ExperienceComponent implements OnInit {

  constructor(
    private data: PortfileService,
    private experienceService: ExperienceService,
    private router: Router) { }

  myPortfile:any;
  lang: any;
  items:any = [];
  @Input() idPerson?: number;
  experiences: Experience[] = [];
  hasExperience: boolean = false;
  textareas!: NodeList;

  ngOnInit(): void {
    
    this.data.getData().subscribe(data =>{
      this.myPortfile=data;
      this.lang = this.myPortfile.es;
      this.items= this.lang.experience.cards;
    });
    this.listExperience();
  }

  ngAfterViewChecked(): void {
    this.textareas = document.querySelectorAll(".text");
    this.textareas.forEach(
      (text:any) => {
        text.style.height =text.scrollHeight+'px';
    });
  }

  listExperience(): void{

    if (this.idPerson){
      this.experienceService.getByPerson(this.idPerson).subscribe(
        data => {
          this.experiences = data;
          this.hasExperience = true;
        },
        err => {
          console.log(err);
        }
      );
    }
  }

  deleteExperience(idExperience?: number): void {

    if(idExperience){
      this.experienceService.delete(idExperience).subscribe(
        data => {
          Swal.fire("Experiencia borrada", "Listo", "success");
          this.listExperience();
          this.router.navigate([`/${this.idPerson}/home`],{fragment: 'experience'});
        },
        err => {
          Swal.fire("Ops...", err.error.message, "error");
        }
      );
    }
  }
}
