import { Injectable } from '@angular/core';
import { CanActivate,  } from '@angular/router';
import { Observable } from 'rxjs';
import {AuthService} from '../services/auth.service';
import {Router} from '@angular/router';

@Injectable(
    {
    providedIn: 'root'
  })
export class NotAuthGuard implements CanActivate {

constructor(
    private authService: AuthService,
    private route: Router,
    ){}

canActivate(){
    if(this.authService.isLoggedIn()){
        console.log("Logged In");
        
        this.route.navigate(['/home']);
        return false;
    }
    else 
    {
        console.log("Logged Out");
        return true;
    }
}
}