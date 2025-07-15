import {Component, OnInit} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {Router, RouterModule} from '@angular/router';
import {ButtonModule} from 'primeng/button';
import {CheckboxModule} from 'primeng/checkbox';
import {InputTextModule} from 'primeng/inputtext';
import {PasswordModule} from 'primeng/password';
import {RippleModule} from 'primeng/ripple';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AuthService} from '../../services/auth.service';
import {NgIf} from '@angular/common';
import {MessageService} from 'primeng/api';
import {Toast} from 'primeng/toast';

@Component({
  selector: 'app-login',
  providers: [AuthService,MessageService],
  imports: [ButtonModule, CheckboxModule, InputTextModule, PasswordModule, FormsModule, RouterModule, RippleModule, ReactiveFormsModule, NgIf, Toast],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup


  constructor(private fb: FormBuilder, private authService: AuthService, private router : Router,private messageService: MessageService) {

  }
  showError() {
    this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Invalid username or password' });
  }
  ngOnInit(): void {
    this.loginForm = this.fb.group({
      username: this.fb.control("", [Validators.required]),
      password: this.fb.control("", [Validators.required]),
    })
  }

  handleLogin() {
    let username = this.loginForm.get("username")?.value
    let password = this.loginForm.get("password")?.value
    console.log(username + " " + password)
    this.authService.login(username, password).subscribe({
      next : value => {
        console.log(value)
        this.authService.loadProfile(value)
        this.router.navigateByUrl("/admin/customer")
      },
      error: err => {
        this.showError()
      },

    })
  }
}
