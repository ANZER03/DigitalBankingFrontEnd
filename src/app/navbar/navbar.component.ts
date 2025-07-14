import {Component, OnInit} from '@angular/core';
import {IconField} from 'primeng/iconfield';
import {Menubar} from 'primeng/menubar';
import {InputIcon} from 'primeng/inputicon';
import {Avatar} from 'primeng/avatar';
import {MenuItem} from 'primeng/api';
import {Router, RouterLink} from '@angular/router';
import {InputText} from 'primeng/inputtext';
import {Select} from 'primeng/select';
import {Menu} from 'primeng/menu';
import {Button} from 'primeng/button';
import {AuthService} from '../services/auth.service';

@Component({
  selector: 'app-navbar',
  imports: [
    IconField,
    Menubar,
    InputIcon,
    Avatar,
    InputText,
    Select,
    RouterLink,
    Menu,
    Button
  ],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent implements OnInit{
  items: MenuItem[] | undefined;
  username!: string;
  profileOptions: MenuItem[] | undefined;
  constructor(private router: Router, private authService : AuthService) {
  }

  ngOnInit(): void {
    this.username = this.authService.username
    this.profileOptions = [
      {
        label: 'Profile',
        icon: 'pi pi-user',
        command: () => {
          this.router.navigate(['/admin/profile']);
        }
      },
      {
        label: 'Quite',
        icon: 'pi pi-sign-out',
        command : ()=>{
          this.logout()
        }
      }
    ];
    this.items = [
      {
        label: 'Home',
        icon: 'pi pi-home',
        command: () => {
          this.router.navigate(['/']);
        }
      },
      {
        label: 'Accounts',
        icon: 'pi pi-id-card',
        items: [
          {
            label: 'Search Account',
            icon: 'pi pi-search',
            command: () => {
              this.router.navigate(['/admin/account-search']);
            }
          },
          {
            label: 'New Account',
            icon: 'pi pi-credit-card',
            visible: this.authService.roles.includes('ADMIN'),
            command : ()=>{
              this.router.navigate(['/admin/new-account'])
            }
          },
        ]
      },
      {
        label: 'Customers',
        icon: 'pi pi-user',
        items: [
          {
            label: 'Search Customer',
            icon: 'pi pi-search',
            command: () => {
              this.router.navigate(['/admin/customer']);
            }
          },
          {
            label: 'New Costumer',
            icon: 'pi pi-user-plus',
            visible: this.authService.roles.includes('ADMIN'),
            command : ()=>{
              this.router.navigate(['/admin/new-customer'])
            }
          },
        ],
      },
    ];
  }

  protected logout() {
      this.authService.logout()
  }
}
