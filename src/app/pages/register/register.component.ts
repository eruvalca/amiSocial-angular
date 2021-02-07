import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { Validators, FormBuilder } from '@angular/forms';
import { RegisterViewModel } from 'src/app/interfaces/registerViewModel';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  registerForm = this.fb.group({
    email: ['', [Validators.required, Validators.maxLength(50), Validators.email]],
    password: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(25)]],
    confirmPassword: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(25)]]
  });

  constructor(
    private fb: FormBuilder,
    private authService: AuthenticationService,
    private location: Location
  ) { }

  ngOnInit(): void {
  }

  submitRegister(): void {
    let registerVM: RegisterViewModel = this.registerForm.getRawValue();
    console.log(registerVM);

    this.authService.register(registerVM)
      .subscribe(response => {
        if (response.isSuccess) {
          console.log(response);
        }
      });
  }

  goBack(): void {
    this.location.back();
  }
}
