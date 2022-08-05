import  Swal  from 'sweetalert2';
import { Person } from './../../models/person';
import { PersonService } from './../../services/person.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  fragm: any;
  person!: Person;
  idPerson?: number;
  isPerson: boolean = false;

  constructor(
    private router: Router,
    private readonly activateRouter: ActivatedRoute,
    private personService: PersonService) { }

  ngOnInit(): void {
    this.idPerson = this.activateRouter.snapshot.params['idPerson'];
    
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

    this.activateRouter.fragment.subscribe((param)=>{
      this.fragm = param;
    });
  }

}
