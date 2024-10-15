import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

import { addIcons } from 'ionicons';
import { logoIonic } from 'ionicons/icons';

@Component({
  selector: 'app-request-password',
  templateUrl: './request-password.page.html',
  styleUrls: ['./request-password.page.scss'],
})
export class RequestPasswordPage implements OnInit {
  form!: FormGroup;
  constructor(
    private fb: FormBuilder,
  ) { 
    addIcons({ logoIonic });
  }

  ngOnInit() {
    this.initForm();
  }

  initForm() {
    this.form = this.fb.group({
      login: []
    })
  }

  onSubmit(){
    
  }

}
