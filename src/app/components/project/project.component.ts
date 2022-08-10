import { Component, OnInit } from '@angular/core';
import { PortfileService } from 'src/app/services/portfile.service';

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.css']
})
export class ProjectComponent implements OnInit {

  constructor(private data: PortfileService) { }

  myPortfile:any;
  lang: any;
  projects:any = [];

  ngOnInit(): void {
    this.data.getData().subscribe(data =>{
      this.myPortfile=data;
      this.lang=this.myPortfile.es;
      this.projects= this.lang.projects.cards;
    });
  }
}
