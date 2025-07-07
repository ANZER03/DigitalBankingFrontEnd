import { Routes } from '@angular/router';
import {CharttestComponent} from './charttest/charttest.component';
import {DashComponent} from './dash/dash.component';
import {LoginComponent} from './login/login.component';

export const routes: Routes = [
  { path: 'charttest', component: CharttestComponent},
  {path : "dash" , component : DashComponent},
  {path : "login" , component : LoginComponent}
];
