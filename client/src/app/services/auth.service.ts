import { Injectable } from '@angular/core';

import { HttpClient , HttpHeaders } from '@angular/common/http';



@Injectable({
  providedIn: 'root'
})
export class AuthService {

  domain: string = "http://localhost:8080";
  authToken;
  user;
  options;

  constructor(private http: HttpClient) { }


  createAuthenticationHeaders() {

    this.authToken = localStorage.getItem('token');

    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'authorization': this.authToken
    });
    this.options = {
      headers: headers,
    }
  };
  



  registerUser(user) {
    return this.http.post<any>(this.domain + '/authentication/register', user);
  }

  checkUsername(username) {
    return this.http.get<any>(this.domain + '/authentication/checkUsername/' + username);
  }

  checkEmail(email) {
    return this.http.get<any>(this.domain + '/authentication/register'+ email);
  }

  login(user){
    return this.http.post<any>(this.domain + '/authentication/login', user); 
  }

  logout() {
    this.authToken = null;
    this.user = null;
    localStorage.clear();
  }

  storeUserData(token, user) {
    localStorage.setItem('token', token);  //save the token in the browser
    localStorage.setItem('user', JSON.stringify(user));
    this.authToken = token;
    this.user = user;
  }

  getProfile() {
    this.createAuthenticationHeaders();
    return this.http.get<any>(this.domain + '/authentication/profile',this.options);
  }
}