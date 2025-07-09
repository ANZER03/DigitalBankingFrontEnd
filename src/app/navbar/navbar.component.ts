import {Component, OnInit} from '@angular/core';
import {IconField} from 'primeng/iconfield';
import {Menubar} from 'primeng/menubar';
import {InputIcon} from 'primeng/inputicon';
import {Avatar} from 'primeng/avatar';
import {MenuItem} from 'primeng/api';
import {Router, RouterLink} from '@angular/router';
import {InputText} from 'primeng/inputtext';
import {Select} from 'primeng/select';

@Component({
  selector: 'app-navbar',
  imports: [
    IconField,
    Menubar,
    InputIcon,
    Avatar,
    InputText,
    Select,
    RouterLink
  ],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent implements OnInit{
  items: MenuItem[] | undefined;

  constructor(private router: Router) {
  }

  ngOnInit(): void {
    this.items = [
      {
        label: 'Home',
        icon: 'pi pi-home',
        command: () => {
          this.router.navigate(['/dash']);
        }
      },
      {
        label: 'Accounts',
        icon: 'pi pi-id-card',
        command: () => {
          this.router.navigate(['/dash']);
        }
      },
      {
        label: 'Customers',
        icon: 'pi pi-user',
        items: [
          {
            label: 'Search Customer',
            icon: 'pi pi-search',
            command: () => {
              this.router.navigate(['/customer']);
            }
          },
          {
            label: 'New Costumer',
            icon: 'pi pi-user-plus',
            command : ()=>{
              this.router.navigate(['/new-customer'])
            }
          },
        ],
      },
    ];
  }
}
