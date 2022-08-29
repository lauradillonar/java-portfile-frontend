import { Person } from './../../models/person';
import { PersonService } from './../../services/person.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-create-person',
  templateUrl: './create-person.component.html',
  styleUrls: ['./create-person.component.css']
})
export class CreatePersonComponent implements OnInit {

  idPerson?: number;
  name: string = '';
  lastname: string = '';
  userName: string = '';
  birthdate: string = '';
  nationality: string = '';
  email: string = '';
  password: string = '';
  phone: string = '';
  aboutMeSub: string = '';
  aboutMe: string = '';
  job: string = '';
  location: string = '';
  authorities: string[]=[];
  imageHeader?: string;
  image?: string;
  logoSrc?: string;
  logoAlt?: string;
  logoUrl?: string;
  facebook?: string;
  instagram?: string;
  twitter?: string;

  constructor(
    private personService: PersonService,
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  onCreate():void{
    const person = new Person(
      this.name,
      this.lastname,
      this.userName,
      this.birthdate,
      this.nationality,
      this.email,
      this.password,
      this.phone,
      this.aboutMeSub,
      this.aboutMe,
      this.job,
      this.location,
      this.authorities,
      this.imageHeader,
      this.image,
      this.logoSrc,
      this.logoAlt,
      this.logoUrl,
      this.facebook,
      this.instagram,
      this.twitter
    );

    this.personService.save(person).subscribe(
      data => {
        this.idPerson = data;
          if (this.idPerson) {
          Swal.fire("Persona Creada", "Listo", "success");
          this.router.navigate([`/${this.idPerson}/home`]);
        } else {
          Swal.fire("Ops...", "No guardado", "error");
          this.router.navigate(['/']);
        }
      },
      err => {
        Swal.fire("Ops...", err.error.message, "error");
        this.router.navigate(['/']);
      }
    );
  }
}
