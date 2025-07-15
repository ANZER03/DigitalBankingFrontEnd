import {Component, OnInit, ViewChild} from '@angular/core';
import {Button} from 'primeng/button';
import {ActivatedRoute, Router, RouterLink} from '@angular/router';
import {Table, TableModule} from 'primeng/table';
import {DropdownModule} from 'primeng/dropdown';
import {CurrencyPipe, DatePipe, NgClass, NgIf} from '@angular/common';
import {BankAccountService} from '../../services/bank-account.service';
import {BankAccount} from '../../models/BankAccount';
import {ConfirmDialog} from 'primeng/confirmdialog';
import {Customer} from '../../models/Customer';
import {CustomerService} from '../../services/customer.service';
import {ConfirmationService, MessageService} from 'primeng/api';
import {dt} from '@primeng/themes';
import {InputText, InputTextModule} from 'primeng/inputtext';

@Component({
  selector: 'app-customer-accounts',
  providers: [MessageService],
  imports: [
    Button,
    TableModule,
    DropdownModule,
    NgClass,
    CurrencyPipe,
    DatePipe,
    InputTextModule,
    NgIf
  ],
  templateUrl: './customer-accounts.component.html',
  styleUrl: './customer-accounts.component.scss'
})
export class CustomerAccountsComponent implements OnInit{
  customerId!: number;
  customer: Customer | null = null;
  accounts: BankAccount[] = [];
  loading = true;

  // Stats
  totalBalance = 0;
  savingAccountsCount = 0;
  currentAccountsCount = 0;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private bankAccountService: BankAccountService,
    private customerService: CustomerService,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {
    this.customerId = +this.route.snapshot.params['customerId'];
    this.loadCustomer();
    this.loadAccounts();
  }

  loadCustomer(): void {
    this.customerService.getCustomer(this.customerId).subscribe({
      next: (customer) => {
        this.customer = customer;
      },
      error: (err) => {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Failed to load customer details'
        });
      }
    });
  }

  loadAccounts(): void {
    this.loading = true;
    this.bankAccountService.getAccountsByCustomer(this.customerId).subscribe({
      next: (accounts) => {
        this.accounts = accounts;
        this.calculateStats();
        this.loading = false;
      },
      error: (err) => {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Failed to load accounts'
        });
        this.loading = false;
      }
    });
  }

  calculateStats(): void {
    this.totalBalance = this.accounts.reduce((sum, acc) => sum + acc.balance, 0);
    this.savingAccountsCount = this.accounts.filter(a => a.type === 'SavingAccount').length;
    this.currentAccountsCount = this.accounts.filter(a => a.type === 'CurrentAccount').length;
  }

  viewAccountDetails(accountId: string): void {
    this.router.navigate(['/accounts', accountId]);
  }

  createNewAccount(): void {
    this.router.navigate(['/accounts/new'], {
      queryParams: { customerId: this.customerId }
    });
  }

  confirmDelete(account: BankAccount): void {
    // this.confirmationService.confirm({
    //   message: `Are you sure you want to delete this ${account.type.toLowerCase()} account?`,
    //   header: 'Confirm Deletion',
    //   icon: 'pi pi-exclamation-triangle',
    //   accept: () => {
    //     this.deleteAccount(account.id);
    //   }
    // });
  }

  deleteAccount(accountId: string): void {
    // this.bankAccountService.deleteAccount(accountId).subscribe({
    //   next: () => {
    //     this.messageService.add({
    //       severity: 'success',
    //       summary: 'Success',
    //       detail: 'Account deleted successfully'
    //     });
    //     this.loadAccounts();
    //   },
    //   error: (err) => {
    //     this.messageService.add({
    //       severity: 'error',
    //       summary: 'Error',
    //       detail: 'Failed to delete account'
    //     });
    //   }
    // });
  }

  protected readonly dt = dt;
}
