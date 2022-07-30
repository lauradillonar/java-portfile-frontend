import { PortfileService } from './../../services/portfile.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-skills',
  templateUrl: './skills.component.html',
  styleUrls: ['./skills.component.css']
})
export class SkillsComponent implements OnInit {

  myPortfile:any;
  lang: any;
  skills:any = [];
  values: number[] = [10,20,30,40,50,60,70,80,90,100];

  constructor(private data: PortfileService) { }

  ngOnInit(): void {
    this.data.getData().subscribe(data =>{
      this.myPortfile=data;
      this.lang=this.myPortfile.es;
      this.skills= this.lang.skills;
    });
  }

}
