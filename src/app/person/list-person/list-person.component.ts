import { Person } from 'src/app/models/person';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { InfoService } from './../../services/info.service';
import { PersonService } from './../../services/person.service';
import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-list-person',
  templateUrl: './list-person.component.html',
  styleUrls: ['./list-person.component.css']
})
export class ListPersonComponent implements OnInit {

  persons: Person[]= [];
  hasPersons: boolean = false;
  
 

  constructor(
    private personService: PersonService,
    private infoService: InfoService,
    private router: Router) { }

  ngOnInit(): void {
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
  

  sendPersonInfo(person: Person):void{
    
    alert("Enviando mensaje desde la lista");
      // this.router.navigate(['home']);
    
  }

  editPerson(idPerson?: number):void{
    if(idPerson){
          this.router.navigate([`edit/${idPerson}`]);
        }
  }

  
  
}

