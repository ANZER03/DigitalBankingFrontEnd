import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardModule } from 'primeng/card';
import { ChartModule } from 'primeng/chart';
import { TableModule } from 'primeng/table';
import { TagModule } from 'primeng/tag';
import { ButtonModule } from 'primeng/button';
import { SkeletonModule } from 'primeng/skeleton';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { InputTextModule } from 'primeng/inputtext';
import {AuthService} from '../../services/auth.service';

interface Transaction {
  id: string;
  date: Date;
  description: string;
  amount: number;
  type: 'CREDIT' | 'DEBIT';
  balance: number;
}

interface MonthlyData {
  month: string;
  balance: number;
  credit: number;
  debit: number;
}

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    CardModule,
    ChartModule,
    TableModule,
    TagModule,
    ButtonModule,
    SkeletonModule,
    IconFieldModule,
    InputIconModule,
    InputTextModule
  ],
  templateUrl: './dashboard.component.html'
})
export class DashboardComponent implements OnInit {
  // Dashboard metrics
  totalBalance: number = 0;
  monthlyDebit: number = 0;
  monthlyCredit: number = 0;
  loading: boolean = true;

  // Chart data
  balanceChartData: any;
  balanceChartOptions: any;

  // Transactions
  recentTransactions: Transaction[] = [];
  globalFilterValue: string = '';


  constructor(private authService : AuthService) {
  }


  // Sample data - replace with actual service calls
  private monthlyData: MonthlyData[] = [
    { month: 'Jan', balance: 15000, credit: 5000, debit: 3000 },
    { month: 'Feb', balance: 17000, credit: 4500, debit: 2500 },
    { month: 'Mar', balance: 19500, credit: 6000, debit: 3500 },
    { month: 'Apr', balance: 22000, credit: 5500, debit: 3000 },
    { month: 'May', balance: 24500, credit: 7000, debit: 4500 },
    { month: 'Jun', balance: 27000, credit: 6500, debit: 4000 },
    { month: 'Jul', balance: 29750, credit: 5750, debit: 3000 }
  ];

  ngOnInit() {
    this.username = this.authService.username
    this.loadDashboardData();
    this.initializeChart();
    this.loadRecentTransactions();
  }

  private loadDashboardData() {
    // Simulate API call
    setTimeout(() => {
      const currentMonth = this.monthlyData[this.monthlyData.length - 1];
      this.totalBalance = currentMonth.balance;
      this.monthlyCredit = currentMonth.credit;
      this.monthlyDebit = currentMonth.debit;
      this.loading = false;
    }, 1000);
  }

  private initializeChart() {
    this.balanceChartData = {
      labels: this.monthlyData.map(data => data.month),
      datasets: [
        {
          label: 'Balance',
          data: this.monthlyData.map(data => data.balance),
          fill: true,
          backgroundColor: 'rgba(99, 102, 241, 0.1)',
          borderColor: 'rgba(99, 102, 241, 1)',
          borderWidth: 3,
          tension: 0.4,
          pointBackgroundColor: 'rgba(99, 102, 241, 1)',
          pointBorderColor: '#ffffff',
          pointBorderWidth: 3,
          pointRadius: 6,
          pointHoverRadius: 8
        },
        {
          label: 'Credit',
          data: this.monthlyData.map(data => data.credit),
          fill: false,
          borderColor: 'rgba(34, 197, 94, 1)',
          backgroundColor: 'rgba(34, 197, 94, 0.1)',
          borderWidth: 3,
          tension: 0.4,
          pointBackgroundColor: 'rgba(34, 197, 94, 1)',
          pointBorderColor: '#ffffff',
          pointBorderWidth: 3,
          pointRadius: 5,
          pointHoverRadius: 7
        },
        {
          label: 'Debit',
          data: this.monthlyData.map(data => data.debit),
          fill: false,
          borderColor: 'rgba(239, 68, 68, 1)',
          backgroundColor: 'rgba(239, 68, 68, 0.1)',
          borderWidth: 3,
          tension: 0.4,
          pointBackgroundColor: 'rgba(239, 68, 68, 1)',
          pointBorderColor: '#ffffff',
          pointBorderWidth: 3,
          pointRadius: 5,
          pointHoverRadius: 7
        }
      ]
    };

    this.balanceChartOptions = {
      maintainAspectRatio: false,
      aspectRatio: 0.6,
      plugins: {
        legend: {
          labels: {
            color: '#374151',
            font: {
              weight: 'bold',
              size: 14
            },
            usePointStyle: true,
            padding: 20
          }
        },
        tooltip: {
          callbacks: {
            label: function(context: any) {
              return context.dataset.label + ': $' + context.parsed.y.toLocaleString();
            }
          },
          backgroundColor: 'rgba(0, 0, 0, 0.9)',
          titleColor: '#ffffff',
          bodyColor: '#ffffff',
          borderColor: 'rgba(255, 255, 255, 0.1)',
          borderWidth: 1,
          cornerRadius: 8
        }
      },
      scales: {
        x: {
          ticks: {
            color: '#6B7280',
            font: {
              weight: '500'
            }
          },
          grid: {
            color: '#E5E7EB',
            drawBorder: false
          }
        },
        y: {
          ticks: {
            color: '#6B7280',
            callback: function(value: any) {
              return '$' + value.toLocaleString();
            },
            font: {
              weight: '500'
            }
          },
          grid: {
            color: '#E5E7EB',
            drawBorder: false
          }
        }
      },
      interaction: {
        intersect: false,
        mode: 'index'
      }
    };
  }

  private loadRecentTransactions() {
    // Sample transaction data - replace with actual service call
    this.recentTransactions = [
      {
        id: 'TXN001',
        date: new Date('2025-07-14'),
        description: 'Salary Credit',
        amount: 5000.00,
        type: 'CREDIT',
        balance: 29750.00
      },
      {
        id: 'TXN002',
        date: new Date('2025-07-13'),
        description: 'Grocery Store',
        amount: -125.50,
        type: 'DEBIT',
        balance: 24750.00
      },
      {
        id: 'TXN003',
        date: new Date('2025-07-12'),
        description: 'Online Transfer',
        amount: -500.00,
        type: 'DEBIT',
        balance: 24875.50
      },
      {
        id: 'TXN004',
        date: new Date('2025-07-11'),
        description: 'Interest Credit',
        amount: 75.50,
        type: 'CREDIT',
        balance: 25375.50
      },
      {
        id: 'TXN005',
        date: new Date('2025-07-10'),
        description: 'ATM Withdrawal',
        amount: -200.00,
        type: 'DEBIT',
        balance: 25300.00
      },
      {
        id: 'TXN006',
        date: new Date('2025-07-09'),
        description: 'Refund',
        amount: 45.99,
        type: 'CREDIT',
        balance: 25500.00
      },
      {
        id: 'TXN007',
        date: new Date('2025-07-08'),
        description: 'Utility Bill',
        amount: -150.75,
        type: 'DEBIT',
        balance: 25454.01
      },
      {
        id: 'TXN008',
        date: new Date('2025-07-07'),
        description: 'Online Purchase',
        amount: -89.99,
        type: 'DEBIT',
        balance: 25604.76
      }
    ];
  }

  formatCurrency(value: number): string {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(value);
  }

  getTransactionSeverity(type: string): string {
    return type === 'CREDIT' ? 'success' : 'danger';
  }

  onGlobalFilter(event: Event) {
    const target = event.target as HTMLInputElement;
    this.globalFilterValue = target.value;
  }

  getFilteredTransactions(): Transaction[] {
    if (!this.globalFilterValue) {
      return this.recentTransactions.slice(0, 6); // Show only first 6 transactions
    }

    const filtered = this.recentTransactions.filter(transaction =>
      transaction.description.toLowerCase().includes(this.globalFilterValue.toLowerCase()) ||
      transaction.id.toLowerCase().includes(this.globalFilterValue.toLowerCase()) ||
      transaction.type.toLowerCase().includes(this.globalFilterValue.toLowerCase())
    );

    return filtered.slice(0, 6);
  }

  refreshData() {
    this.loading = true;
    this.loadDashboardData();
    this.loadRecentTransactions();
  }

  protected readonly Math = Math;
  username!: string;
}
