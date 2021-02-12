import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './Components/home/home.component';
import {DashboardComponent} from './Components/dashboard/dashboard.component'
import {RegisterComponent} from './Components/register/register.component'
import { LoginComponent } from './Components/login/login.component';
import {ProfileComponent} from './Components/profile/profile.component';

const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'register',component: RegisterComponent},
  {path: 'login', component: LoginComponent},
  {path: 'profile', component: ProfileComponent},
  {path: 'dashboard', component: DashboardComponent},
  {path: '**', component: HomeComponent}
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }