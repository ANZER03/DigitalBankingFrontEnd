import { Routes } from '@angular/router';
import {CharttestComponent} from './charttest/charttest.component';
import {DashComponent} from './dash/dash.component';
import {LoginComponent} from './login/login.component';
import {CustomerComponent} from './customer/customer.component';
import {NewCustomerComponent} from './new-customer/new-customer.component';
import {AccountComponent} from './account/account.component';
import {AdminComponent} from './admin/admin.component';
import {authenticationGuard} from './guards/authentication.guard';
import {NotAuthorizeComponent} from './not-authorize/not-authorize.component';
import {authorizationGuard} from './guards/authorization.guard';
import {NewAccountComponent} from './new-account/new-account.component';
import {CustomerAccountsComponent} from './customer-accounts/customer-accounts.component';

export const routes: Routes = [
  {path : "login" , component : LoginComponent},
  {path : "" , redirectTo : "login", pathMatch : "full"},
  {path : "admin" , component: AdminComponent,canActivate: [authenticationGuard] ,children: [
      { path: 'new-customer', component: NewCustomerComponent, canActivate: [authorizationGuard]},
      {path : "customer" , component : CustomerComponent},
      {
        path: 'customer/:customerId/accounts',
        component: CustomerAccountsComponent
      },
      {path : "account-search" , component : AccountComponent},
      {path : "new-account" , component : NewAccountComponent},
      {path : "not-authorize" , component : NotAuthorizeComponent},
    ]},


];
