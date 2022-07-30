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

  constructor(
    private personService: PersonService,
    private activateRoute: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    const idPerson = this.activateRoute.snapshot.params['idPerson'];
    this.personService.home(idPerson).subscribe(
      data => {
        this.person = data;
      },
      err => {
        Swal.fire("Ops...",err.error.message, "error");
        this.router.navigate(['/']);
      }
    );
  }

  onUpdate(): void{
    const idPerson = this.activateRoute.snapshot.params['idPerson'];
    this.personService.update(idPerson, this.person).subscribe(
      data => {
        Swal.fire("Datos Actualizados", "Listo", "success");
        this.router.navigate(['/']);
      },
      err => {
        Swal.fire("Ops...", err.error.message, "error");
        this.router.navigate(['/']);
      }
    );
  }

}
