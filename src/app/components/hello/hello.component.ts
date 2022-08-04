import { isNull } from '@angular/compiler/src/output/output_ast';
import { Component, Input, OnInit } from '@angular/core';
import { Person } from 'src/app/models/person';
import { PortfileService } from 'src/app/services/portfile.service';

@Component({
  selector: 'app-hello',
  templateUrl: './hello.component.html',
  styleUrls: ['./hello.component.css']
})
export class HelloComponent implements OnInit {

  constructor(private data: PortfileService) { }

  myPortfile:any;
  lang: any;
  @Input() person!: Person;
  @Input() isPerson?: boolean;

  ngOnInit(): void {
    this.data.getData().subscribe(data =>{
      this.myPortfile=data;
      this.lang = this.myPortfile.es;
    });
  }

}
