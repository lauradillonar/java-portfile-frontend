import { Skill } from './../../../models/skill';
import { PortfileService } from './../../../services/portfile.service';
import { ActivatedRoute, Router } from '@angular/router';
import { SkillService } from './../../../services/skill.service';
import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-create-skill',
  templateUrl: './create-skill.component.html',
  styleUrls: ['./create-skill.component.css']
})
export class CreateSkillComponent implements OnInit {

  idPerson!: number;
  item: string = '';
  progress: number = 10;

  myProfile: any;
  lang: any;
  label: any;

  constructor(
    private skillService: SkillService,
    private activateRoute: ActivatedRoute,
    private router: Router,
    private labels: PortfileService
  ) { }

  ngOnInit(): void {
    this.idPerson = this.activateRoute.snapshot.params['idPerson'];

    this.labels.getData().subscribe(
      data => {
        this.myProfile = data;
        this.lang = this.myProfile.es;
        this.label = this.lang.skills.label;
      },
      err => {
        console.log(err);
      }
    );
  }

  onCreate(): void {
    const skill = new Skill(
      this.idPerson,
      this.item,
      this.progress
    );

    this.skillService.save(skill, this.idPerson).subscribe(
      data => {
        Swal.fire("Tecnología guardada", "Listo", "success");
        this.router.navigate([`/${this.idPerson}/home`]);
      },
      err => {
        Swal.fire("Ops...", err.error.messge, "error");
        this.router.navigate([`/${this.idPerson}/home`]);
      }
    );
  }

}
