import { Component, OnInit } from '@angular/core';

import { addIcons } from 'ionicons';
import { logoIonic } from 'ionicons/icons';

@Component({
  selector: 'app-signup-success',
  templateUrl: './signup-success.page.html',
  styleUrls: ['./signup-success.page.scss'],
})
export class SignupSuccessPage implements OnInit {

  constructor() { 
    addIcons({ logoIonic });
  }

  ngOnInit() {
  }

}
