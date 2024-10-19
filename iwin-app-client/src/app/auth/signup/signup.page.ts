import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';

import { addIcons } from 'ionicons';
import { logoIonic } from 'ionicons/icons';
import { AuthService } from 'src/service/auth/auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
})
export class SignupPage implements OnInit {
  form!: FormGroup;
  userTypeControl = new FormControl('usuario');

  constructor(
    private fb: FormBuilder,
    private authService:AuthService
  ) { 
    addIcons({ logoIonic });
  }

  ngOnInit(): void {
    this.initForm();
  }

  selectUserType(value: string): void {
    this.form.patchValue({ userType: value }); 
  }

  initForm(){
    this.form = this.fb.group({
      name: [''],
      login: [''],
      password: ['']
    })
  }

  getValueControl(form:FormGroup, control:string){
    return form.controls[control].value;
  }

  payloadRegister(){
    const payload  = {
      displayName: this.getValueControl(this.form, 'name'),
      password: this.getValueControl(this.form, 'password'),
      email: this.getValueControl(this.form, 'login'),
    };

    return payload;
  }

  register() {
    const payload = this.payloadRegister();
    this.authService.createUser(payload).subscribe(
      response => {
        console.log('Usuário criado com sucesso:', response);
      },
      error => {
        console.error('Erro ao criar usuário:', error);
      }
    );
  }

}
