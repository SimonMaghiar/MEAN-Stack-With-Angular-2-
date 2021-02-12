import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './Components/home/home.component';
import {DashboardComponent} from './Components/dashboard/dashboard.component'
import {RegisterComponent} from './Components/register/register.component'
import { LoginComponent } from './Components/login/login.component';
import {ProfileComponent} from './Components/profile/profile.component';
import {AuthGuard} from './guards/auth.guard';
import {NotAuthGuard} from './guards/notAuth.guard';

const routes: Routes = [
  {
    path: '', 
    component: HomeComponent
  },
  {
    path: 'register',
    component: RegisterComponent,
    canActivate: [NotAuthGuard]
  },
  {
    path: 'login', 
    component: LoginComponent,
    canActivate: [NotAuthGuard]
  },
  {
    path: 'profile',
    component: ProfileComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [AuthGuard]},
  {
    path: '**', 
    component: HomeComponent
  }
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }