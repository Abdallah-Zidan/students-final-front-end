import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  isLoading = false;
  error = '';

  constructor(private authService: AuthService, private router: Router) {}

  onSubmit(form: NgForm) {
    this.isLoading = true;
    if (form.valid) {
      this.authService.login(form.value.email, form.value.password).subscribe(
        (res) => {
          if (res) {
            console.log(res);
            this.router.navigate(['/']);
            this.isLoading = false;
          }
        },
        (error) => {
          console.log(error);
          this.error = error.error.Message;
          this.isLoading = false;
          setTimeout(() => {
            this.error = '';
          }, 2000);
        }
      );
    }
  }
}
