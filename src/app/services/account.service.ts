import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {AccountDetails, AccountOperationDTO} from '../models/account.model';

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  backUrl : String = 'http://localhost:8085'
  constructor(private http : HttpClient) { }

  getAccount(accountId: string): Observable<AccountDetails> {
    return this.http.get<AccountDetails>(this.backUrl+"/accounts/"+accountId)
  }
  getOperationsAccount(accountId: string): Observable<AccountOperationDTO[]> {
    return this.http.get<AccountOperationDTO[]>(this.backUrl+"/accounts/"+accountId+"/operations")
  }

  addDebitOperation(operation: any) {
    return this.http.post(this.backUrl+"/accounts/debit", operation)
  }

  addCreditOperation(operation: any) {
    return this.http.post(this.backUrl+"/accounts/credit", operation)
  }

  AddTransferOperation(operation: any) {
    return this.http.post(this.backUrl+"/accounts/transfer", operation)
  }
}
