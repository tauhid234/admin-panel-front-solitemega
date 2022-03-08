import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StatusPernikahanComponent } from './status-pernikahan.component';

describe('StatusPernikahanComponent', () => {
  let component: StatusPernikahanComponent;
  let fixture: ComponentFixture<StatusPernikahanComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StatusPernikahanComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StatusPernikahanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
