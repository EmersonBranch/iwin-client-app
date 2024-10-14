import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SignupSuccessPage } from './signup-success.page';

describe('SignupSuccessPage', () => {
  let component: SignupSuccessPage;
  let fixture: ComponentFixture<SignupSuccessPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(SignupSuccessPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
