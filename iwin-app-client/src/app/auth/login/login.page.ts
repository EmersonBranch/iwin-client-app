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
  userType: string = 'usuario';

  constructor(
    private fb: FormBuilder,
    private authService:AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.initForm();
  }

  selectUserType(value: string): void {
    this.userType = value;
    this.form.get('userType')?.setValue(value);
  }

  initForm(){
    this.form = this.fb.group({
      email: [''],
      password: [''],
      userType: ['usuario']
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
