import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Customer} from '../models/Customer';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  backUrl: String = 'http://localhost:8085'

  constructor(private http: HttpClient) {
  }

  getCustomers(): Observable<Array<Customer>> {
    return this.http.get<Array<Customer>>(this.backUrl + '/customers');
  }

  searchCustomers(keyword: String): Observable<Array<Customer>> {
    return this.http.get<Array<Customer>>(this.backUrl + '/customers/search?keyword=' + keyword);
  }

  deleteCustomer(customer: Customer) {
    return this.http.delete(this.backUrl + '/customers/' + customer.id);
  }

  updateCustomer(customer: Customer) {
    return this.http.put(this.backUrl + '/customers/' + customer.id, customer);
  }

  saveCustomer(customer: Customer): Observable<Customer> {
    return this.http.post<Customer>(this.backUrl + "/customers", customer)
  }

  getCustomer(customerId: number) {
    return this.http.get<Customer>(this.backUrl + '/customers/' + customerId);
  }

  changePassword(customerId: number, currentPassword: any, newPassword: any, confirmationPassword: any) {
    let options = {
      headers: new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
    }

    let params = new HttpParams()
      .set("customerId", customerId)
      .set("currentPassword", currentPassword)
      .set("newPassword", newPassword)
      .set("confirmationPassword", confirmationPassword)

    return this.http.post(this.backUrl + "/customer/changePassword", params, options)
  }

  getCustomerByName() {
    return this.http.get<Customer>(this.backUrl + '/customer/profile');
  }
}
