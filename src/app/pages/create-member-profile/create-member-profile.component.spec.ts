import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateMemberProfileComponent } from './create-member-profile.component';

describe('CreateMemberProfileComponent', () => {
  let component: CreateMemberProfileComponent;
  let fixture: ComponentFixture<CreateMemberProfileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateMemberProfileComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateMemberProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
