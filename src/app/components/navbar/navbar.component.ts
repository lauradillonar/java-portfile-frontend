import { TokenService } from './../../services/token.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { Person } from './../../models/person';
import { Component, Input, OnInit } from '@angular/core';
import { PortfileService } from 'src/app/services/portfile.service';
import { PersonService } from 'src/app/services/person.service';

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
  isLogged = false;

  constructor(
    private data: PortfileService,
    private personService: PersonService,
    private router: Router,
    private tokenService: TokenService) { }

  ngOnInit(): void {

    if (this.tokenService.getToken()){
      this.isLogged = true;
    }else{
      this.isLogged = false;
    }

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

  onLogOut():void{
    this.tokenService.logOut();
    window.location.reload();
  }
}
