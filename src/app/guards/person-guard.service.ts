import { TokenService } from './../services/token.service';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PersonGuardService implements CanActivate{
  
  realRole!: String;

  constructor(
    private tokenService: TokenService,
    private router: Router
  ) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
     const expectedRole = route.data['expectedRole'];  
     const roles = this.tokenService.getAuthorities();

     this.realRole = 'user';

     roles.forEach(role => {
      if (role === 'ROLE_ADMIN'){
        this.realRole = 'admin';
      }
     });
     if (!this.tokenService.getToken() || expectedRole.indexOf(this.realRole) === -1 ){
      this.router.navigate(['/']);
      return false;
     }

     return true;
  }
}
