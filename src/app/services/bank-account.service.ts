import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {Validators} from '@angular/forms';
import {Observable} from 'rxjs';
import {BankAccount} from '../models/BankAccount';

@Injectable({
  providedIn: 'root'
})
export class BankAccountService {
  backUrl: String = 'http://localhost:8085'

  constructor(private http: HttpClient) {
  }

  // this.bankAccountForm = this.fb.group({
  //   customerId: ['', Validators.required],
  //   accountType: ['', Validators.required],
  //   balance: [0, [Validators.required, Validators.min(0)]],
  //   overdraftLimit: [0],
  //   interestRate: [0.5, [Validators.min(0), Validators.max(20)]]
  // });


  createAccount(formData: any) {
    let options = {
      headers: new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
    }

    if (formData.accountType == "SAVING") {
      let params = new HttpParams().set("initialeBalance" , formData.balance).set("interestRate" , formData.interestRate).set("customerId", formData.customerId)
      return this.http.post(this.backUrl + "/accounts/saveSavingAccount", params, options)
    } else {
      let params = new HttpParams().set("initialeBalance" , formData.balance).set("overDraft" , formData.overdraftLimit).set("customerId", formData.customerId)

      return this.http.post(this.backUrl + "/accounts/saveCurrentAccount", params, options)
    }
  }

  getAccountsByCustomer(customerId: number):Observable<Array<BankAccount>> {
    // /customer/1/accounts
    return this.http.get<Array<BankAccount>>(this.backUrl + "/customer/"+customerId+"/accounts")
  }
}
