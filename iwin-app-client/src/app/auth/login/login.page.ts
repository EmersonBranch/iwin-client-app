import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  form!: FormGroup;

  constructor(
    private fb: FormBuilder,
  ) {}

  ngOnInit(): void {
    this.initForm();
  }

  initForm(){
    this.form = this.fb.group({
      login: [],
      password: []
    })
  }

  onSubmit() {
  //   const loginInfo = {
  //     username: this.username,
  //     password: this.password,
  //     type: this.loginType,  // Indica se é 'usuario' ou 'lojista'
  //   };

  //   // Logar ou enviar as informações conforme necessário
  //   if (this.loginType === 'usuario') {
  //     console.log('Login como Usuário:', loginInfo);
  //     // Aqui você pode chamar a função de autenticação para usuário
  //   } else {
  //     console.log('Login como Lojista:', loginInfo);
  //     // Aqui você pode chamar a função de autenticação para lojista
  //   }

  //   // Resetar os campos após o login (opcional)
  //   this.username = '';
  //   this.password = '';
  }

}
