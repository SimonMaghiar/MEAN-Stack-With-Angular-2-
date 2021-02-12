import { Component, OnInit } from '@angular/core';
import {FormGroup, FormBuilder, Validators, FormControl} from '@angular/forms'
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  message: string;
  messageClass;
  processing: boolean = false;
  form: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router
    ) 
  { 
    this.createForm();
  }

  ngOnInit(): void {
  }

  createForm() {
    this.form = this.formBuilder.group({
      username: ['',Validators.required],
      password: ['',Validators.required]
    });
  }

  onLoginSubmit()
  {
    this.processing = true;
    const user = {
      username: this.form.get('username').value,
      password: this.form.get('password').value
    }

    this.authService.login(user).subscribe(data => {
      if(!data.success){
        this.messageClass = 'alert alert-danger';
        this.message = data.message;
        this.processing = false;  
      }
      else {
        this.messageClass = 'alert alert-success';
        this.message = data.message;
        this.authService.storeUserData(data.token,data.user);
        setTimeout(() => {
          this.router.navigate(['/dashboard']);
        },2000)
      }
    })
  }




}