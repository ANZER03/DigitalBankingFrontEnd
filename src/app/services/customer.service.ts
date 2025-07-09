import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Customer} from '../models/Customer';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  backUrl : String = 'http://localhost:8085'

  constructor(private http : HttpClient) { }

  getCustomers() : Observable<Array<Customer>>{
    return this.http.get<Array<Customer>>(this.backUrl+'/customers');
  }

  searchCustomers(keyword : String) : Observable<Array<Customer>>{
    return this.http.get<Array<Customer>>(this.backUrl+'/customers/search?keyword='+keyword);
  }

  deleteCustomer(customer: Customer) {
    return this.http.delete(this.backUrl+'/customers/'+customer.id);
  }

  updateCustomer (customer : Customer) {
    return this.http.put(this.backUrl+'/customers/'+customer.id, customer);
  }

  saveCustomer(customer: Customer): Observable<Customer> {
    return this.http.post<Customer>(this.backUrl+"/customers", customer)
  }
}
