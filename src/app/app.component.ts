import {ChangeDetectorRef, Component, effect, inject, OnInit, PLATFORM_ID, ProviderToken} from '@angular/core';
import {Router, RouterLink, RouterOutlet} from '@angular/router';
import {CardModule} from 'primeng/card';
import {ButtonModule} from 'primeng/button';
import {Menubar} from 'primeng/menubar';
import {Badge} from 'primeng/badge';
import {Avatar} from 'primeng/avatar';
import {isPlatformBrowser, NgClass, NgIf, NgOptimizedImage} from '@angular/common';
import {MenuItem} from 'primeng/api';
import { ChartModule } from 'primeng/chart';
import {Ripple} from 'primeng/ripple';
import {InputText} from 'primeng/inputtext';
import {Tab, TabList, TabPanel, TabPanels, Tabs} from 'primeng/tabs';
import {TableModule} from 'primeng/table';
import {IconField} from 'primeng/iconfield';
import {InputIcon} from 'primeng/inputicon';
import {NavbarComponent} from './navbar/navbar.component';

class Customer {
}

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, CardModule, ButtonModule, Menubar, Badge, Avatar, NgClass, ChartModule, NgIf, Ripple, InputText, Tabs, TabList, Tab, TabPanels, TabPanel, TableModule, RouterLink, IconField, InputIcon, NavbarComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit{
  title = 'DigitalBankingFrontEnd';
  items: MenuItem[] | undefined;
  products : any = [{
    id: '1000',
    code: 'f230fh0g3',
    name: 'Bamboo Watch',
    description: 'Product Description',
    image: 'bamboo-watch.jpg',
    price: 65,
    category: 'Accessories',
    quantity: 24,
    inventoryStatus: 'INSTOCK',
    rating: 5
  }];

  unlockedCustomers!: [{
    id: 1000,
    name: 'James Butt',
    country: {
      name: 'Algeria',
      code: 'dz'
    },
    company: 'Benton, John B Jr',
    date: '2015-09-13',
    status: 'unqualified',
    verified: true,
    activity: 17,
    representative: {
      name: 'Ioni Bowcher',
      image: 'ionibowcher.png'
    },
    balance: 70663
  }];

  // @ts-ignore
  lockedCustomers!: any [{
    id: 1000,
    name: 'James Butt',
    country: {
      name: 'Algeria',
      code: 'dz'
    },
    company: 'Benton, John B Jr',
    date: '2015-09-13',
    status: 'unqualified',
    verified: true,
    activity: 17,
    representative: {
      name: 'Ioni Bowcher',
      image: 'ionibowcher.png'
    },
    balance: 70663
  }];

  get isDashRoute(): boolean {
    return this.router.url.includes('/dash') || this.router.url.includes('/login');
  }

  constructor(private cd: ChangeDetectorRef, private router: Router) {}
  ngOnInit() {
    this.items = [
      {
        label: 'Home',
        icon: 'pi pi-home',
        command: () => {
          this.router.navigate(['/dash']);
        }
      },
      {
        label: 'Projects',
        icon: 'pi pi-search',
        items: [
          {
            label: 'Login',
            icon: 'pi pi-bolt',
            shortcut: '⌘+S',
            command: () => {
              this.router.navigate(['/login']);
            }
          },
          {
            label: 'Blocks',
            icon: 'pi pi-server',
            shortcut: '⌘+B',
            command : ()=>{
              this.router.navigate(['/charttest'])
            }
          },
          {
            separator: true,
          },
          {
            label: 'UI Kit',
            icon: 'pi pi-pencil',
            shortcut: '⌘+U',
          },
        ],
      },
    ];
  }
  toggleLock(data: Customer, frozen: boolean, index: number) {
    if (frozen) {
      this.lockedCustomers = this.lockedCustomers.filter((c: any, i: number) => i !== index);
      // @ts-ignore
      this.unlockedCustomers.push(data);
    } else {
      // @ts-ignore
      this.unlockedCustomers = this.unlockedCustomers.filter((c, i) => i !== index);
      this.lockedCustomers.push(data);
    }

    this.unlockedCustomers.sort((val1, val2) => {
      return val1.id < val2.id ? -1 : 1;
    });
  }
}
