import { ActivatedRoute, Router } from '@angular/router';
import { PersonService } from './../../services/person.service';
import { Person } from './../../models/person';
import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-edit-person',
  templateUrl: './edit-person.component.html',
  styleUrls: ['./edit-person.component.css']
})
export class EditPersonComponent implements OnInit {

  person!: Person;
  hasPersons: boolean = false;
  idPerson?: number;

  constructor(
    private personService: PersonService,
    private activateRoute: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.idPerson = this.activateRoute.snapshot.params['idPerson'];

    if(this.idPerson){
      this.personService.home(this.idPerson).subscribe(
        data => {
          this.person = data;
          this.hasPersons = true;
        },
        err => {
          Swal.fire("Ops...",err.error.message, "error");
          this.router.navigate(['/']);
        }
      );
    }else{
      Swal.fire("Ops...", "Error", "error");
      this.router.navigate(['/']);
    }
  }

  onUpdate(): void{
    if(this.idPerson){
      this.personService.update(this.idPerson, this.person).subscribe(
        data => {
          Swal.fire("Datos Actualizados", "Listo", "success");
          this.router.navigate([`/${this.idPerson}/home`], {fragment: 'main'});
        },
        err => {
          Swal.fire("Ops...", err.error.message, "error");
          this.router.navigate(['/']);
        }
      );
    }else{
      Swal.fire("Ops...", "Error", "error");
      this.router.navigate(['/']);
    }
  }
}