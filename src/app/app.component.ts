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
import {NavbarComponent} from './Components/navbar/navbar.component';
import {AuthService} from './services/auth.service';

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

  constructor(private authService: AuthService,) {
  }

  ngOnInit(): void {
    this.authService.loadJwtFromLocalStorage()
  }
}
