import {Routes} from '@angular/router';
import {CharttestComponent} from './Components/charttest/charttest.component';
import {DashComponent} from './Components/dash/dash.component';
import {LoginComponent} from './Components/login/login.component';
import {CustomerComponent} from './Components/customer/customer.component';
import {NewCustomerComponent} from './Components/new-customer/new-customer.component';
import {AccountComponent} from './Components/account/account.component';
import {AdminComponent} from './Components/admin/admin.component';
import {authenticationGuard} from './guards/authentication.guard';
import {NotAuthorizeComponent} from './Components/not-authorize/not-authorize.component';
import {authorizationGuard} from './guards/authorization.guard';
import {NewAccountComponent} from './Components/new-account/new-account.component';
import {CustomerAccountsComponent} from './Components/customer-accounts/customer-accounts.component';
import {ProfileComponent} from './Components/profile/profile.component';
import {DashboardComponent} from './Components/dashboard/dashboard.component';

export const routes: Routes = [
  {path: "login", component: LoginComponent},
  {path: "", redirectTo: "login", pathMatch: "full"},
  {
    path: "admin", component: AdminComponent, canActivate: [authenticationGuard], children: [
      {path: 'new-customer', component: NewCustomerComponent, canActivate: [authorizationGuard]},
      {path: "customer", component: CustomerComponent},
      {path: "profile", component: ProfileComponent},
      {path: 'customer/:customerId/accounts', component: CustomerAccountsComponent},
      {path: "account-search", component: AccountComponent},
      {path: "new-account", component: NewAccountComponent},
      {path: "not-authorize", component: NotAuthorizeComponent},
      {path : "dashboard", component: DashboardComponent}
    ]
  },


];
