import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot , Router } from '@angular/router';
import { Observable } from 'rxjs';
import {AuthService} from '../services/auth.service';


@Injectable({
    providedIn: 'root'
  })
  export class AuthGuard implements CanActivate {

    redirectUrl;

    constructor(
        private authService: AuthService,
        private route: Router,
        ){}
  
    canActivate(router: ActivatedRouteSnapshot, state: RouterStateSnapshot)
    {
        if(this.authService.isLoggedIn()){
            return true;
        }
        else 
        {
            this.redirectUrl = state.url;
            this.route.navigate(['/login']);
            return false;
        }
    }
  }