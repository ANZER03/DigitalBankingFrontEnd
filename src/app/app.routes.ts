import { Routes } from '@angular/router';
import {CharttestComponent} from './charttest/charttest.component';
import {DashComponent} from './dash/dash.component';
import {LoginComponent} from './login/login.component';
import {CustomerComponent} from './customer/customer.component';
import {NewCustomerComponent} from './new-customer/new-customer.component';
import {AccountComponent} from './account/account.component';

export const routes: Routes = [
  { path: 'new-customer', component: NewCustomerComponent},
  {path : "account-search" , component : AccountComponent},
  {path : "login" , component : LoginComponent},
  {path : "customer" , component : CustomerComponent},
];
