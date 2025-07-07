import {Component, OnInit} from '@angular/core';
import {IconField} from 'primeng/iconfield';
import {Menubar} from 'primeng/menubar';
import {InputIcon} from 'primeng/inputicon';
import {Avatar} from 'primeng/avatar';
import {MenuItem} from 'primeng/api';
import {Router} from '@angular/router';
import {InputText} from 'primeng/inputtext';

@Component({
  selector: 'app-navbar',
  imports: [
    IconField,
    Menubar,
    InputIcon,
    Avatar,
    InputText
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
        label: 'Customers',
        icon: 'pi pi-user',
        command: () => {
          this.router.navigate(['/dash']);
        }
      },
      {
        label: 'Accounts',
        icon: 'pi pi-id-card',
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
            label: 'Chart',
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
}
