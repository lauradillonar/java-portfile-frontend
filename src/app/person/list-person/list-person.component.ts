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

  constructor(private personService: PersonService) { }

  ngOnInit(): void {
    this.listPerson();
  }

  listPerson(): void{
    this.personService.list().subscribe(
      data => {
        this.persons = data;
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
