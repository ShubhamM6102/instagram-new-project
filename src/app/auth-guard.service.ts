import { Injectable } from '@angular/core';
// import { ActivatedRouteSnapshot, CanActivate } from '@angular/router';
import { Router, CanActivate, ActivatedRouteSnapshot,RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { LoginService } from './login.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate{

  constructor(public loginService: LoginService, private router: Router) { }
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    if(this.loginService.validate()){
      
        return true;
    }
    else{
      this.router.navigate(['/']);
      return false;
   
  }

}
}