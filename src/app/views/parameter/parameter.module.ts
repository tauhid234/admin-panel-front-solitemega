import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ParameterRoutingModule } from './parameter-routing.module';
import { PendidikanComponent } from './pendidikan/pendidikan.component';
import { StatusPernikahanComponent } from './status-pernikahan/status-pernikahan.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ModalModule } from 'ngx-bootstrap/modal';


@NgModule({
  declarations: [
    PendidikanComponent,
    StatusPernikahanComponent
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    ParameterRoutingModule,
    FormsModule,
    ModalModule.forRoot()
  ]
})
export class ParameterModule { }
