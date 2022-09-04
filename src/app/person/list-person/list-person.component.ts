import { TokenService } from './../../services/token.service';
import { PersonService } from './../../services/person.service';
import { Person } from './../../models/person';
import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-list-person',
  templateUrl: './list-person.component.html',
  styleUrls: ['./list-person.component.css']
})
export class ListPersonComponent implements OnInit {

  persons: Person[] = [];
  hasPersons: boolean = false;
  isLogged = false;
  userName = '';
  idPerson?: number;
  isPerson: boolean = false;
  isAdmin: boolean = false;
  roles!: string[];

  constructor(
    private personService: PersonService,
    private tokenService: TokenService
  ) { }

  ngOnInit(): void {
    if(this.tokenService.getToken()){
      this.isLogged = true;
      this.userName = this.tokenService.getUserName();
      if(this.userName){
        this.personService.getId(this.userName).subscribe(
          id => {
            this.idPerson = id;
            this.isPerson = true;
          }
        );  
      }
      this.roles = this.tokenService.getAuthorities();
      this.roles.forEach(role => {
        if (role == 'ROLE_ADMIN'){
          this.isAdmin = true;
        }
      });
    }else{
      this.isLogged = false;
      this.userName = '';
    }
    this.listPerson();
  }

  listPerson(): void{
    this.personService.list().subscribe(
      data => {
        this.persons = data;
        this.hasPersons = true;
      },
      err => {
        console.log(err);
      }
    );
  }

  deletePerson(idPerson?: number){
    if (idPerson){
    this.personService.delete(idPerson).subscribe(
      data => {
        Swal.fire("Persona dada de baja", "Listo", "success");
        this.listPerson();
      },
      err => {
        Swal.fire("Ops...", err.error.message, "error");
      });
    }
  }
}
