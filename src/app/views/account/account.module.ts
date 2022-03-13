import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AccountRoutingModule } from './account-routing.module';
import { AdminComponent } from './admin/admin.component';
import { FormsModule } from '@angular/forms';
import { ModalModule } from 'ngx-bootstrap/modal';
import { UserProfileComponent } from './user-profile/user-profile.component';


@NgModule({
  declarations: [
    AdminComponent,
    UserProfileComponent
  ],
  imports: [
    CommonModule,
    AccountRoutingModule,
    FormsModule,
    ModalModule.forRoot()
  ]
})
export class AccountModule { }
