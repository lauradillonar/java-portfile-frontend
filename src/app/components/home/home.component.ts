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
  _person!: Person;

  constructor(
    private router: Router,
    private readonly activateRouter: ActivatedRoute,
    private personService: PersonService) { }

  get person():Person {
    return this._person;
  }

  set person(value: Person) {
    this._person = value;
  }

  ngOnInit(): void {
    const idPerson = this.activateRouter.snapshot.params['idPerson'];

    this.personService.home(idPerson).subscribe(
      data => {
        this.person = data;
      },
      err => {
        Swal.fire("Ops...",err.error.message, "error");
        this.router.navigate(['/']);
      }
    );

    this.activateRouter.fragment.subscribe((param)=>{
      this.fragm = param;
      console.log(this.fragm);
    });
  }

}
