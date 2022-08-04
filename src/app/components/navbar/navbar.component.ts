import { Person } from './../../models/person';
import { Component, Input, OnInit } from '@angular/core';
import { PortfileService } from 'src/app/services/portfile.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  myPortfile:any;
  items:any = [];
  lang: any;
  @Input() person!: Person;

  constructor(
    private data: PortfileService) { }

  ngOnInit(): void {

    this.data.getData().subscribe(data =>{
      this.myPortfile=data;
      this.lang = this.myPortfile.es;
      this.items= this.lang.navbar.cards;
    });
  }
}
