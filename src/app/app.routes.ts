import { Routes } from '@angular/router';
import {CharttestComponent} from './charttest/charttest.component';
import {DashComponent} from './dash/dash.component';
import {LoginComponent} from './login/login.component';
import {CustomerComponent} from './customer/customer.component';
import {NewCustomerComponent} from './new-customer/new-customer.component';

export const routes: Routes = [
  { path: 'new-customer', component: NewCustomerComponent},
  {path : "dash" , component : DashComponent},
  {path : "login" , component : LoginComponent},
  {path : "customer" , component : CustomerComponent}
];
