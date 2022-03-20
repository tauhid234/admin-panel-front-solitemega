import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubmissionCreditComponent } from './submission-credit.component';

describe('SubmissionCreditComponent', () => {
  let component: SubmissionCreditComponent;
  let fixture: ComponentFixture<SubmissionCreditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SubmissionCreditComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SubmissionCreditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
