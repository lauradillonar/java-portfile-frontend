import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { PersonService } from './../../services/person.service';
import { Person } from './../../models/person';
import { Component, Input, OnInit } from '@angular/core';
import { PortfileService } from 'src/app/services/portfile.service';

@Component({
  selector: 'app-aboutme',
  templateUrl: './aboutme.component.html',
  styleUrls: ['./aboutme.component.css']
})
export class AboutmeComponent implements OnInit {

  constructor(
    private labelService: PortfileService,
    private personService: PersonService,
    private router: Router
  ) { }
  
  myPortfile:any;
  lang: any;
  labels: any;
  @Input() idPerson?: number;
  person!: Person;
  isPerson: boolean = false;
  textareas!: NodeList;

  ngOnInit(): void {
    console.log("About: ", this.idPerson);
    this.labelService.getData().subscribe(
      data =>{
        this.myPortfile=data;
        this.lang=this.myPortfile.es;
        this.labels = this.lang.about.label;
      }, 
      err => {
        console.log(err);
      }
    );

    if(this.idPerson){
      this.personService.home(this.idPerson).subscribe(
        data => {
          this.person = data;
          this.isPerson = true;
        },
        err => {
          Swal.fire("Ops...", err.error.message, "error");    
          this.router.navigate(['/']);
        }
      );
    }else{
      Swal.fire("Ops...", "No hay datos", "error");
      this.router.navigate(['/']);
    }
  }

  ngAfterViewChecked(): void {
    this.textareas = document.querySelectorAll(".text");
    this.textareas.forEach(
      (text:any) => {
        text.style.height =text.scrollHeight+'px';
    });
  }
}
