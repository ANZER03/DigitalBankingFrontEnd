import { Component } from '@angular/core';
import {Button} from 'primeng/button';
import {RouterLink} from '@angular/router';

@Component({
  selector: 'app-not-authorize',
  imports: [
    Button,
    RouterLink
  ],
  templateUrl: './not-authorize.component.html',
  styleUrl: './not-authorize.component.scss'
})
export class NotAuthorizeComponent {

}
