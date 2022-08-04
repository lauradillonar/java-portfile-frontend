import { Person } from './../../models/person';
import { Component, Input, OnInit } from '@angular/core';
import { PortfileService } from 'src/app/services/portfile.service';

@Component({
  selector: 'app-aboutme',
  templateUrl: './aboutme.component.html',
  styleUrls: ['./aboutme.component.css']
})
export class AboutmeComponent implements OnInit {

  constructor(private data: PortfileService) { }
  
  myPortfile:any;
  lang: any;
  @Input() person!: Person;
  @Input() isPerson?: boolean;

  ngOnInit(): void {
    this.data.getData().subscribe(data =>{
      this.myPortfile=data;
      this.lang=this.myPortfile.es;
    });
  }
}
