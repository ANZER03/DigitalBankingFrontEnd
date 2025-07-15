import {Component, OnInit} from '@angular/core';
import {AsyncPipe, DatePipe, DecimalPipe, NgIf} from "@angular/common";
import {Button} from "primeng/button";
import {ConfirmDialog} from "primeng/confirmdialog";
import {Dialog} from "primeng/dialog";
import {IconField} from "primeng/iconfield";
import {InputText} from "primeng/inputtext";
import {Message} from "primeng/message";
import {ProgressSpinner} from "primeng/progressspinner";
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {TableModule, TablePageEvent} from "primeng/table";
import {Toast} from "primeng/toast";
import {AccountDetails, AccountOperationDTO} from '../../models/account.model';
import {AccountService} from '../../services/account.service';
import {catchError, Observable, throwError} from 'rxjs';
import {Tag} from 'primeng/tag';
import {MessageService} from 'primeng/api';
import {AuthService} from '../../services/auth.service';

@Component({
  selector: 'app-account',
  providers : [MessageService],
  imports: [
    AsyncPipe,
    Button,
    ConfirmDialog,
    Dialog,
    IconField,
    InputText,
    Message,
    NgIf,
    ProgressSpinner,
    ReactiveFormsModule,
    TableModule,
    Toast,
    DecimalPipe,
    DatePipe,
    Tag
  ],
  templateUrl: './account.component.html',
  styleUrl: './account.component.scss'
})
export class AccountComponent implements OnInit {
  accountDetails!: Observable<AccountDetails>;
  accountOperations!: Observable<AccountOperationDTO[]>
  accountFormGroup!: FormGroup;
  operationFormGroup!: FormGroup;
  transferFormGroup!: FormGroup
  showDebitDialog: boolean = false;
  showCreditDialog: boolean = false;
  showTransferDialog: boolean = false;
  constructor(private fb: FormBuilder, private accountService: AccountService, private messageService: MessageService, public authSerivce: AuthService) {
  }

  ngOnInit(): void {
    this.accountFormGroup = this.fb.group(
      {
        accountId: this.fb.control("", [Validators.required])
      }
    )
    this.operationFormGroup = this.fb.group(
      {
        accountId : this.fb.control(""),
        amount : this.fb.control(0),
        description : this.fb.control(""),

      }
    )
    this.transferFormGroup = this.fb.group(
      {
        accountDestination : this.fb.control(""),
        amount : this.fb.control(0),
        description : this.fb.control(""),
      }
    )
  }

  SearchAccount() {
    let accountId = this.accountFormGroup.get("accountId")?.value
    this.accountDetails = this.accountService.getAccount(accountId).pipe(
      catchError(err => {
        return throwError(err);
        }
      )
    )
    this.accountOperations = this.accountService.getOperationsAccount(accountId).pipe(
      catchError(err => {
        return throwError(err)
      })
    )
    //   .subscribe({
    //     next: value => {
    //         this.accountDetails = value
    //     },
    //     error: error => {
    //         console.log(error)
    //     }
    //   }
    // )
  }

  pageChange(event: TablePageEvent) {
    console.log(event.first)
    console.log(event.rows)
  }

  cancelDebitOperation() {

  }

  processDebitOperation() {
    let operation : any = {
      accountId: this.accountFormGroup.get("accountId")?.value,
      amount : this.operationFormGroup.get("amount")?.value,
      description : this.operationFormGroup.get("description")?.value,
    }


    this.accountService.addDebitOperation(operation).subscribe({
      next : value => {
        console.log(value)
        this.showDebitDialog= false
        this.operationFormGroup.reset()
        this.SearchAccount()
        this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Debit Success' });
      },
      error : err => {
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Server Error' });
      }
    })
  }

  cancelCreditOperation() {

  }

  processCreditOperation() {
    let operation : any = {
      accountId: this.accountFormGroup.get("accountId")?.value,
      amount : this.operationFormGroup.get("amount")?.value,
      description : this.operationFormGroup.get("description")?.value,
    }


    this.accountService.addCreditOperation(operation).subscribe({
      next : value => {
        console.log(value)
        this.showCreditDialog= false
        this.operationFormGroup.reset()
        this.SearchAccount()
        this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Credit Success' });
      },
      error : err => {
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Server Error' });
      }
    })
  }

  cancelTransferOperation() {

  }

  processTransferOperation() {
    let operation : any = {
      accountSource : this.accountFormGroup.get("accountId")?.value,
      accountDestination : this.transferFormGroup.get("accountDestination")?.value,
      amount : this.transferFormGroup.get("amount")?.value,
      description : this.transferFormGroup.get("description")?.value,
    }

    this.accountService.AddTransferOperation(operation).subscribe({
      next : value => {
        console.log(value)
        this.showTransferDialog= false
        this.transferFormGroup.reset()
        this.SearchAccount()
        this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Transfer Success' });
      },
      error : err => {
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Server Error' });
      }
    })


  }

  addCreditOperation() {
    this.showCreditDialog = true
  }

  addTransferOperation() {
    this.showTransferDialog = true
  }

  addDebitOperation() {
    this.showDebitDialog = true
  }
}
