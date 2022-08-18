import { PortfileService } from './../../../services/portfile.service';
import { SkillService } from './../../../services/skill.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Skill } from './../../../models/skill';
import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-edit-skill',
  templateUrl: './edit-skill.component.html',
  styleUrls: ['./edit-skill.component.css']
})
export class EditSkillComponent implements OnInit {

  skill!: Skill;
  idPerson?: number;
  idSkill?: number;
  hasSkill: boolean = false;

  myPortfile: any;
  lang: any;
  label: any;

  constructor(
    private activateRoute: ActivatedRoute,
    private router: Router,
    private skillService: SkillService,
    private labels: PortfileService
  ) { }

  ngOnInit(): void {
    this.labels.getData().subscribe(
      data => {
        this.myPortfile = data;
        this.lang = this.myPortfile.es;
        this.label = this.lang.skills.label;
      },
      err => {
        console.log(err);
      }
    );

    this.idSkill = this.activateRoute.snapshot.params['idSkill'];
    this.idPerson = this.activateRoute.snapshot.params['idPerson'];

    if (this.idSkill){
      this.skillService.getOne(this.idSkill).subscribe(
        data => {
          if(data.idPerson != this.idPerson){
            Swal.fire("Ops...", "No autorizado", "error");
            this.router.navigate(['/']);
          } else {
            this.skill = data;
            this.hasSkill = true;
          }
        },
        err => {
          Swal.fire("Ops...", err.error.message, "error");
          this.router.navigate([`/home`]);
        }
      );
    }
  }

  onUpdate(): void {
    if(this.skill.idSkill && this.idPerson){
      this.skillService.update(this.skill.idSkill, this.skill, this.idPerson).subscribe(
        data => {
          Swal.fire("Datos Actualizados", "Listo", "success");
          this.router.navigate([`/home`]);
        },
        err => {
          Swal.fire("Ops...", err.error.message, "error");
          this.router.navigate([`/home`]);
        }
      );
    }   
  }

}
