import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RequestPasswordPage } from './request-password.page';

describe('RequestPasswordPage', () => {
  let component: RequestPasswordPage;
  let fixture: ComponentFixture<RequestPasswordPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(RequestPasswordPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
