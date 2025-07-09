import {Component, OnInit, ViewChild} from '@angular/core';
import {Toast} from 'primeng/toast';
import { ConfirmDialog } from 'primeng/confirmdialog';
import {ButtonModule} from 'primeng/button';
import {ConfirmationService, MessageService } from 'primeng/api';
import { Ripple } from 'primeng/ripple';
import {Toolbar} from 'primeng/toolbar';
import {Table, TableModule} from 'primeng/table';
import {IconField} from 'primeng/iconfield';
import {InputIcon} from 'primeng/inputicon';
import {Dialog} from 'primeng/dialog';
import {Customer} from '../models/Customer';
import {InputText} from 'primeng/inputtext';
import {FormBuilder, FormGroup, ReactiveFormsModule} from '@angular/forms';
import {HttpClient} from '@angular/common/http';
import {CustomerService} from '../services/customer.service';
import {AsyncPipe, NgIf} from '@angular/common';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import {catchError, map, Observable, throwError} from 'rxjs';
import {ProgressSpinner} from 'primeng/progressspinner';
import {Message} from 'primeng/message';

@Component({
  selector: 'app-customer',
  imports: [
    Toast,
    ButtonModule,
    TableModule,
    IconField,
    InputText,
    ReactiveFormsModule,
    NgIf,
    ConfirmDialog,
    AsyncPipe,
    ProgressSpinner,
    Message,
    Dialog
  ],
  providers: [MessageService, ConfirmationService],
  templateUrl: './customer.component.html',
  styleUrl: './customer.component.scss'
})
export class CustomerComponent implements OnInit{
  // @ts-ignore
  customers!: Observable<Array<Customer>>
  searchFormGroup! : FormGroup;
  updateFormGroup! : FormGroup;
  errorMessage!: any;
  visible: boolean = false;
  constructor(private confirmationService: ConfirmationService,private messageService: MessageService, private fb : FormBuilder, private http : HttpClient, private customerService: CustomerService) {
  }

  ngOnInit(): void {
    this.searchFormGroup=this.fb.group({
      keyword : this.fb.control("")
    });
    this.updateFormGroup= this.fb.group({
      id : this.fb.control(0),
      name : this.fb.control(""),
      email: this.fb.control("")
    })
    this.searchCustomers()

    // this.customers = this.customerService.getCustomers().subscribe({
    //   next:(resp)=>{
    //     console.log(resp)
    //     this.customers = resp
    //   },
    //   error: (err)=>{
    //       console.error(err)
    //   }
    // })
  }


  searchCustomers() {
    let kw = this.searchFormGroup?.value.keyword
    this.customers = this.customerService.searchCustomers(kw).pipe(
      catchError(err => {
        this.errorMessage=err.message;
        return throwError(err);
      })
    );
  }

  showSuccess() {
    this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Customer Deleted' });
  }
  showError() {
    this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Delete Not work!' });
  }

  handleDeleteCustomer(customer: Customer, event: Event) {
    this.confirmationService.confirm({
      target: event.target as EventTarget,
      message: 'Do you want to delete this record?',
      header: 'Danger Zone',
      icon: 'pi pi-info-circle',
      rejectLabel: 'Cancel',
      rejectButtonProps: {
        label: 'Cancel',
        severity: 'secondary',
        outlined: true,
      },
      acceptButtonProps: {
        label: 'Delete',
        severity: 'danger',
      },

      accept: () => {
        this.customerService.deleteCustomer(customer).subscribe({
          next : resp =>{
            this.showSuccess()
            // this.searchCustomers()
            this.customers = this.customers.pipe(
              map(data=>{
                let index=data.indexOf(customer);
                data.slice(index,1)
                return data;
              })
            );
          },
          error : err => {
            this.showError()
            console.log(err)
          }
        })
      },
      reject: () => {
        // this.messageService.add({ severity: 'error', summary: 'Rejected', detail: 'You have rejected' });
      },
    });
  }

  updateCustomer(customer: Customer) {

  }

  updateDialog(customer: Customer) {
    this.updateFormGroup.setValue({
      id : customer.id,
      name: customer.name,
      email: customer.email
    });
    this.visible = true;
  }

  saveUpdatedCustomer() {
    let customer: Customer = {
      id: this.updateFormGroup.get('id')?.value,
      name: this.updateFormGroup.get('name')?.value,
      email: this.updateFormGroup.get('email')?.value
    }
    // console.log(customer)
    let cus = this.customerService.updateCustomer(customer).subscribe({
      next : value => {
        this.searchCustomers()
        this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Customer Updated' });
      },
      error : err => {
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Error in Update' });
      }
      }
    )
    this.visible = false;
  }
}
