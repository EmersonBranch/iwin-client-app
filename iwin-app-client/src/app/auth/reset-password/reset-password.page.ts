import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { addIcons } from 'ionicons';
import { logoIonic } from 'ionicons/icons';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.page.html',
  styleUrls: ['./reset-password.page.scss'],
})
export class ResetPasswordPage implements OnInit {
  form!: FormGroup;
  isToastOpen = false;
  constructor(
    private fb: FormBuilder
  ) { 
    addIcons({ logoIonic });
  }

  ngOnInit(): void {
    this.initForm();
  }

  setOpen(isOpen: boolean) {
    this.isToastOpen = isOpen;
  }

  initForm(){
    this.form = this.fb.group({
      password: ['', [Validators.required]],
      confirmPassword: ['', [Validators.required]]
    });
  }

  onSubmit() {
    this.checkPasswords();

    if (this.form.valid) {
      // Lógica para enviar a nova senha
      console.log('Senha redefinida com sucesso');
    } else {
      this.checkPasswords();
    }
  }

  checkPasswords() {
    const password = this.form.get('password')?.value;
    const confirmPassword = this.form.get('confirmPassword')?.value;

    if (password !== confirmPassword) {
      this.form.setErrors({ mismatch: true });
      this.setOpen(true);
    } else {
      this.form.setErrors(null); // Remove o erro se as senhas coincidirem
    }
  }

}
