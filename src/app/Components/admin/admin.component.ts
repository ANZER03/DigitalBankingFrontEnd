import { Component } from '@angular/core';
import {NavbarComponent} from "../navbar/navbar.component";
import {NgIf} from "@angular/common";
import {RouterOutlet} from '@angular/router';

@Component({
  selector: 'app-admin',
  imports: [
    NavbarComponent,
    NgIf,
    RouterOutlet
  ],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.scss'
})
export class AdminComponent {

}
