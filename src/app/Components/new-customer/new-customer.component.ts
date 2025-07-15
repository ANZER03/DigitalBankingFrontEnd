import {Component, OnInit} from '@angular/core';
import {Button} from 'primeng/button';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {InputText} from 'primeng/inputtext';
import {NgIf} from '@angular/common';
import {Toast} from 'primeng/toast';
import {Message} from 'primeng/message';
import {Router} from '@angular/router';
import {Customer} from '../../models/Customer';
import {CustomerService} from '../../services/customer.service';
import {ToastModule} from 'primeng/toast';
import {MessageService} from 'primeng/api';

@Component({
  selector: 'app-new-customer',
  imports: [
    Button,
    ReactiveFormsModule,
    InputText,
    NgIf,
    Toast,
    Message
  ],
  providers: [CustomerService, MessageService],
  templateUrl: './new-customer.component.html',
  styleUrl: './new-customer.component.scss'
})
export class NewCustomerComponent implements OnInit {
  constructor(private messageService: MessageService, private fb: FormBuilder, private router: Router, private customerService: CustomerService) {
  }

  newCustomerFormGroup!: FormGroup;
  isSaved: boolean = false
  saveCustomer() {
    let customer: Customer = {
      id: 0,
      name: this.newCustomerFormGroup.get("name")?.value,
      email: this.newCustomerFormGroup.get("email")?.value,
    }
    this.customerService.saveCustomer(customer).subscribe(
      {
        next: value => {
          this.messageService.add({severity: 'success', summary: 'Success', detail: 'Customer Saved'});
          this.newCustomerFormGroup.setValue({
            id: 0,
            name: "",
            email: "",
          })
          this.isSaved = true
        },
        error: err => {
          this.messageService.add({severity: 'error', summary: 'Error', detail: 'Error in saving'});
        }
      }
    )
  }

  cancel() {
    this.router.navigate(['/customer']);
  }

  ngOnInit(): void {
    this.newCustomerFormGroup = this.fb.group({
      id: null,
      name: this.fb.control("", [Validators.required, Validators.minLength(5)]),
      email: this.fb.control("", [Validators.required, Validators.email])
    });
  }
}
