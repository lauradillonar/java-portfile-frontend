import { Router } from '@angular/router';
import { PersonService } from 'src/app/services/person.service';
import { TokenService } from './../../services/token.service';
import { LoginUser } from './../../models/login-user';
import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login-person',
  templateUrl: './login-person.component.html',
  styleUrls: ['./login-person.component.css']
})
export class LoginPersonComponent implements OnInit {

  isLogged = false;
  isLoginFail = false;
  loginUser!: LoginUser;
  userName!: string;
  password!: string;
  roles: string[]=[];
  errMsg: string = '';

  constructor(
    private tokenService: TokenService,
    private personService: PersonService,
    private router: Router
  ) { }

  ngOnInit(): void {
    if(this.tokenService.getToken()){
      this.isLogged = true;
      this.isLoginFail = false;
      this.roles = this.tokenService.getAuthorities();
    }
  }

  onLogin():void{
    this.loginUser = new LoginUser(this.userName, this.password);
    this.personService.login(this.loginUser).subscribe(
      data => {
        this.isLogged = true;
        this.isLoginFail = false;

        this.tokenService.setToken(data.token);
        this.tokenService.setUserName(data.userName);
        this.tokenService.setAuthorities(data.authorities);
        this.roles = data.authorities;

        Swal.fire("Hola "+data.userName, "", "success");

        this.personService.getId(this.userName).subscribe(
          id => {
            this.router.navigate([`/${id}/home`]);
          }
        );
        
      },
      err => {
        this.isLogged = false;
        this.isLoginFail = true;
        this.errMsg = err.error.message;
        Swal.fire("Ops...", this.errMsg, "error");
      }
    );
  }
}
