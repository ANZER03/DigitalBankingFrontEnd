import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Validators} from '@angular/forms';
import {Observable} from 'rxjs';

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
    if (formData.accountType == "SAVING") {
      let data = {
        initialeBalance: formData.balance,
        interestRate: formData.interestRate,
        customerId: formData.customerId
      }
      return this.http.post(this.backUrl + "/accounts/saveSavingAccount", data)
    } else {
      let data = {
        initialeBalance: formData.balance,
        overDraft: formData.overdraftLimit,
        customerId: formData.customerId
      }
      return this.http.post(this.backUrl + "/accounts/saveCurrentAccount", data)
    }
  }
}
