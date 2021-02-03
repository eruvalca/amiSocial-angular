import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { LoginViewModel } from 'src/app/interfaces/loginViewModel';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm = this.fb.group({
    email: ['', [Validators.required, Validators.maxLength(50), Validators.email]],
    password: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(25)]]
  });

  constructor(private fb: FormBuilder, private authService: AuthenticationService) { }

  ngOnInit(): void {
  }

  submitLogin(): void {
    let loginVM: LoginViewModel = this.loginForm.getRawValue();
    console.log(loginVM);

    this.authService.login(loginVM)
      .subscribe(response => {
        if (response.isSuccess) {
          console.log(response);
        }
      });
  }
}
