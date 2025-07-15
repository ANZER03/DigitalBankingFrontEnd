import {Component, OnInit} from '@angular/core';
import {Select} from 'primeng/select';
import {Button} from 'primeng/button';
import {InputText} from 'primeng/inputtext';
import {Message} from 'primeng/message';
import {NgIf} from '@angular/common';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {Toast} from 'primeng/toast';
import {MessageService} from 'primeng/api';
import {DropdownModule} from 'primeng/dropdown';
import {SelectButton} from 'primeng/selectbutton';
import {InputNumber} from 'primeng/inputnumber';
import {CustomerService} from '../../services/customer.service';
import {Router} from '@angular/router';
import {Customer} from '../../models/Customer';
import {BankAccountService} from '../../services/bank-account.service';

@Component({
  selector: 'app-new-account',
  providers: [MessageService],
  imports: [
    Button,
    NgIf,
    ReactiveFormsModule,
    Toast,
    DropdownModule,
    InputNumber
  ],
  templateUrl: './new-account.component.html',
  styleUrl: './new-account.component.scss'
})

export class NewAccountComponent implements OnInit {
  bankAccountForm: FormGroup;
  customers!: Customer[]
  accountTypes = ['SAVING', 'CURRENT'];

  constructor(
    private fb: FormBuilder,
    private customerService: CustomerService,
    private bankAccountService: BankAccountService,
    private messageService: MessageService,
    private router: Router
  ) {
    this.bankAccountForm = this.fb.group({
      customerId: ['', Validators.required],
      accountType: ['', Validators.required],
      balance: [0, [Validators.required, Validators.min(0)]],
      overdraftLimit: [0],
      interestRate: [0.5, [Validators.min(0), Validators.max(20)]]
    });
  }

  ngOnInit(): void {
    this.loadCustomers();

    // Watch for account type changes to show/hide relevant fields
    this.bankAccountForm.get('accountType')?.valueChanges.subscribe(type => {
      if (type === 'SAVING') {
        this.bankAccountForm.get('overdraftLimit')?.reset(0);
      } else if (type === 'CURRENT') {
        this.bankAccountForm.get('interestRate')?.reset(0);
      }
    });
  }

  loadCustomers(): void {
    this.customerService.getCustomers().subscribe({
      next: (customers) => {
        this.customers = customers;
      },
      error: (err) => {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Failed to load customers'
        });
      }
    });
  }

  isFieldInvalid(field: string): boolean {
    const formField = this.bankAccountForm.get(field);
    return formField ? formField.invalid && (formField.dirty || formField.touched) : false;
  }

  onSubmit(): void {
    if (this.bankAccountForm.invalid) {
      console.log(this.bankAccountForm)
      this.bankAccountForm.markAllAsTouched();
      return;
    }else{
      console.log(this.bankAccountForm)
    }

    const formData = this.bankAccountForm.value;
    this.bankAccountService.createAccount(formData).subscribe({
      next: () => {
        // this.router.navigate(['/admin']);
        this.messageService.add({
          severity: 'success',
          summary: 'Success',
          detail: 'Bank account created successfully'
        });
        this.bankAccountForm.reset()
      },
      error: (err) => {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Failed to create bank account'
        });
      }
    });
  }

  onCancel(): void {
    this.router.navigate(['/admin']);
  }
}
