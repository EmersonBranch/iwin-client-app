import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RequestPasswordPageRoutingModule } from './request-password-routing.module';

import { RequestPasswordPage } from './request-password.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RequestPasswordPageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [RequestPasswordPage]
})
export class RequestPasswordPageModule {}
