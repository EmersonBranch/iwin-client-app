import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';

import { addIcons } from 'ionicons';
import { logoIonic } from 'ionicons/icons';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
})
export class SignupPage implements OnInit {
  form!: FormGroup;
  userTypeControl = new FormControl('usuario');

  constructor(
    private fb: FormBuilder
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
      name: [],
      login: [],
      password: [],
      userType: ['usuario']
    })
  }

  onSubmit() {
  }

}
