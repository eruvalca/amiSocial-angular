import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { Validators, FormBuilder } from '@angular/forms';
import { RegisterViewModel } from 'src/app/interfaces/registerViewModel';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { MemberService } from 'src/app/services/member.service';
import { Router } from '@angular/router';

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
    private location: Location,
    private memberService: MemberService,
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  submitRegister(): void {
    let registerVM: RegisterViewModel = this.registerForm.getRawValue();

    this.authService.register(registerVM)
      .subscribe(response => {
        if (response.isSuccess) {
          this.isUserMember();
        }
      });
  }

  isUserMember(): void {
    this.memberService.getMemberByUser()
      .subscribe(member => {
        if (member != null) {
          this.router.navigate(['dashboard']);
        } else {
          this.router.navigate(["profile"]);
        }
      });
  }

  goBack(): void {
    this.location.back();
  }
}
