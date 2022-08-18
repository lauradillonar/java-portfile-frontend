import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { Person } from './../../models/person';
import { Component, Input, OnInit } from '@angular/core';
import { PortfileService } from 'src/app/services/portfile.service';
import { PersonService } from 'src/app/services/person.service';
import { async } from '@firebase/util';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  myPortfile:any;
  items:any = [];
  lang: any;
  @Input() idPerson?: number;
  person!: Person;
  isPerson: boolean = false;

  constructor(
    private data: PortfileService,
    private personService: PersonService,
    private router: Router) { }

  ngOnInit(): void {

    this.data.getData().subscribe(data =>{
      this.myPortfile=data;
      this.lang = this.myPortfile.es;
      this.items= this.lang.navbar.cards;
    });

    if(this.idPerson){
      this.personService.home(this.idPerson).subscribe(
        data => {
          this.person = data;
          this.isPerson = true;
        },
        err => {
          Swal.fire("Ops...",err.error.message, "error");
          this.router.navigate(['/']);
        }
      );
    }
  }
}
