import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Member } from 'src/app/interfaces/member';
import { MemberService } from 'src/app/services/member/member.service';

@Component({
  selector: 'app-create-member-profile',
  templateUrl: './create-member-profile.component.html',
  styleUrls: ['./create-member-profile.component.css']
})
export class CreateMemberProfileComponent implements OnInit {
  profileForm = this.fb.group({
    firstName: ['', [Validators.required]],
    middleName: [''],
    lastName: ['', [Validators.required]],
    familyNickname: [''],
    dateOfBirth: ['', [Validators.required]]
  });

  constructor(
    private fb: FormBuilder,
    private memberService: MemberService,
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  submitProfile(): void {
    let newMember: Member = this.profileForm.getRawValue();
    console.log(newMember);

    this.memberService.createMember(newMember)
      .subscribe(response => {
        if (response.memberId > 0) {
          console.log('Send user to dashboard.');
          // this.router.navigate(["dashboard"]);
        }
      });
  }
}
