import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { GlobalAuthService } from '../../../../global-services/global-auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(8)])
  });

  constructor(
    private authService: AuthService,
    private router: Router,
    private globalAuthService: GlobalAuthService
  ) { }

  ngOnInit() {
    if ( this.globalAuthService.isLogin ) {
      this.router.navigate(['/']);
    }
  }

  onSubmit() {
    this.authService.login({ ...this.loginForm.value }).subscribe((res) => {
      this.router.navigate(['/']);
    }, (err) => {
      this.loginForm.patchValue({password: ''});
    });
  }

}
