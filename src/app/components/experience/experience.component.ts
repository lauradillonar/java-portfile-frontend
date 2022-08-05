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
    private experienceService: ExperienceService) { }

  myPortfile:any;
  lang: any;
  items:any = [];
  @Input() idPerson?: number;
  experiences: Experience[] = [];
  hasExperience: boolean = false;

  ngOnInit(): void {
    
    this.data.getData().subscribe(data =>{
      this.myPortfile=data;
      this.lang = this.myPortfile.es;
      this.items= this.lang.experience.cards;
    });
    this.listExperience();
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
    console.log("Borrar experiencia ",idExperience);
  }
}
