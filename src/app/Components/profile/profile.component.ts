import {Component, OnInit} from '@angular/core';
import {Button} from 'primeng/button';
import {Timeline} from 'primeng/timeline';
import {Dialog} from 'primeng/dialog';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {InputText} from 'primeng/inputtext';
import {Password} from 'primeng/password';
import {Customer} from '../../models/Customer';
import {ActivatedRoute, Router} from '@angular/router';
import {CustomerService} from '../../services/customer.service';
import {MessageService} from 'primeng/api';
import {BankAccountService} from '../../services/bank-account.service';
import {DatePipe} from '@angular/common';
import {AuthService} from '../../services/auth.service';
import {Toast} from 'primeng/toast';

interface Activity {
  action: string;
  description: string;
  date: Date;
}

@Component({
  selector: 'app-profile',
  providers: [MessageService],
  imports: [
    Button,
    Timeline,
    Dialog,
    ReactiveFormsModule,
    InputText,
    Password,
    DatePipe,
    Toast
  ],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss'
})
export class ProfileComponent implements OnInit {
  customerId!: number;
  customer!: Customer;
  accountCount = 0;
  displayEditDialog = false;
  displayPasswordDialog = false;

  editForm: FormGroup;
  passwordForm: FormGroup;

  activities: Activity[] = [
    {
      action: 'Account Created',
      description: 'Current account opened with initial deposit',
      date: new Date(2025, 6, 15)
    },
    {
      action: 'Profile Updated',
      description: 'Changed email address',
      date: new Date(2025, 5, 22)
    },
    {
      action: 'Account Activity',
      description: 'Large deposit received',
      date: new Date(2025, 5, 10)
    }
  ];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private customerService: CustomerService,
    private bankAccountService: BankAccountService,
    private fb: FormBuilder,
    private authService: AuthService,
    private messageService: MessageService
  ) {
    this.editForm = this.fb.group({
      id: 0,
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]]
    });

    this.passwordForm = this.fb.group({
      currentPassword: ['', Validators.required],
      newPassword: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required]
    }, {validators: this.passwordMatchValidator});
  }

  ngOnInit(): void {
    this.loadCustomer();
  }

  loadCustomer(): void {
    this.customerService.getCustomerByName().subscribe({
      next: (customer) => {
        this.customer = customer;
        this.customerId = customer.id
        this.editForm.patchValue({
          id: customer.id,
          name: customer.name,
          email: customer.email
        });
        this.loadAccountCount()
      },
      error: (err) => {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Failed to load customer data'
        });
      }
    });
  }

  loadAccountCount(): void {
    this.bankAccountService.getAccountsByCustomer(this.customerId).subscribe({
      next: (accounts) => {
        this.accountCount = accounts.length;
      }
    });
  }

  showEditDialog(): void {
    this.displayEditDialog = true;
  }

  showPasswordDialog(): void {
    this.passwordForm.reset();
    this.displayPasswordDialog = true;
  }

  updateProfile(): void {
    if (this.editForm.invalid) return;

    const updatedData = this.editForm.value;
    console.log(updatedData);
    this.customerService.updateCustomer(updatedData).subscribe({
      next: () => {
        this.messageService.add({
          severity: 'success',
          summary: 'Success',
          detail: 'Profile updated successfully'
        });
        // this.loadCustomer();
        this.authService.logout()
        this.displayEditDialog = false;
      },
      error: (err) => {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Failed to update profile'
        });
      }
    });
  }

  changePassword(): void {
    if (this.passwordForm.invalid) return;

    const {currentPassword, newPassword, confirmPassword} = this.passwordForm.value;
    this.customerService.changePassword(this.customerId, currentPassword, newPassword, confirmPassword).subscribe({
      next: () => {
        this.messageService.add({
          severity: 'success',
          summary: 'Success',
          detail: 'Password changed successfully'
        });
        this.displayPasswordDialog = false;
        this.authService.logout()
      },
      error: (err) => {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: err.error?.message || 'Failed to change password'
        });
      }
    });
  }

  passwordMatchValidator(form: FormGroup): { [key: string]: boolean } | null {
    const newPassword = form.get('newPassword')?.value;
    const confirmPassword = form.get('confirmPassword')?.value;

    return newPassword === confirmPassword ? null : {mismatch: true};
  }
}
