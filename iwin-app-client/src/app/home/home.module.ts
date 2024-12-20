import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { HomePageRoutingModule } from './home-routing.module';

import { HomePage } from './home.page';

import { AvatarComponent } from '../components/avatar/avatar.component';
import { NotificationComponent } from '../components/notification/notification.component';
import { SearchComponent } from '../components/search/search.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HomePageRoutingModule
  ],
  declarations: [HomePage, AvatarComponent, NotificationComponent, SearchComponent]
})
export class HomePageModule {}
