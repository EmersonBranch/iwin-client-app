import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/service/auth/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  form!: FormGroup;
  userTypeControl = new FormControl('usuario');

  constructor(
    private fb: FormBuilder,
    private authService:AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.initForm();
  }

  selectUserType(value: string): void {
    this.form.patchValue({ userType: value }); 
  }

  initForm(){
    this.form = this.fb.group({
      email: [''],
      password: ['']
    })
  }

  submit() {
    if (this.isValidForm()) {
      const { email, password } = this.form.value;
      this.authService.login({ email, password })
        .subscribe({
          next: () => {
            this.router.navigate(['home']).then(() => {
            });
          },
          error: (error: any) => {
            console.error('Erro de autenticação:', error.code, error.message);
           
          }
        });
    }
  }
  
  isValidForm() {
    return this.form.valid;
  }

  limparFormulario() {
    this.form.reset({});
  }

}
