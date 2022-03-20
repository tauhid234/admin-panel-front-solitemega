import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormRoutingModule } from './form-routing.module';
import { SubmissionCreditComponent } from '../submission-credit/submission-credit.component';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    SubmissionCreditComponent
  ],
  imports: [
    CommonModule,
    FormRoutingModule,
    FormsModule
  ]
})
export class FormModule { }
