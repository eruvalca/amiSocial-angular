import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Location } from '@angular/common';
import { LoginViewModel } from 'src/app/interfaces/loginViewModel';
import { AuthenticationService } from 'src/app/services/authentication/authentication.service';
import { MemberService } from 'src/app/services/member/member.service';
import { Router } from '@angular/router';

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

  constructor(
    private fb: FormBuilder,
    private authService: AuthenticationService,
    private location: Location,
    private memberService: MemberService,
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  submitLogin(): void {
    let loginVM: LoginViewModel = this.loginForm.getRawValue();

    this.authService.login(loginVM)
      .subscribe(async response => {
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
