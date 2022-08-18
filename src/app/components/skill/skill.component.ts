import { Observable } from 'rxjs';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { SkillService } from './../../services/skill.service';
import { Skill } from './../../models/skill';
import { PortfileService } from '../../services/portfile.service';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-skill',
  templateUrl: './skill.component.html',
  styleUrls: ['./skill.component.css']
})
export class SkillComponent implements OnInit {

  myPortfile:any;
  lang: any;
  items:any = [];
  @Input() idPerson?: number;
  skills: Skill[] = [];
  hasSkill: boolean = false;
  values: number[] = [10,20,30,40,50,60,70,80,90,100];

  constructor(
    private data: PortfileService,
    private skillService: SkillService,
    private router: Router) { }

  ngOnInit(): void {
    this.data.getData().subscribe(data =>{
      this.myPortfile=data;
      this.lang=this.myPortfile.es;
      this.items= this.lang.skills.bars;
    });

      this.listSkill();
  }
  
  listSkill(): void{

    if(this.idPerson){
      this.skillService.getByPerson(this.idPerson).subscribe(
        data => {
          this.skills = data;
          this.hasSkill = true;
        },
        err => {
          console.log(err);
        }
      );
    }
  }

  deleteSkill(idSkill?: number): void {
    if(idSkill){
      this.skillService.delete(idSkill).subscribe(
        data => {
          Swal.fire("Tecnología borrada", "Listo", "success");
          this.listSkill();
          this.router.navigate([`/home`]);
        },
        err => {
          Swal.fire("Ops...", err.error.message, "error");
        }
      );
    }
  }

}
