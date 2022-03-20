import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SubmissionCreditComponent } from '../submission-credit/submission-credit.component';

const routes: Routes = [
  {
    path : '',
    data : {
      title : 'Form'
    },
    children : [
      {
        path : 'submission-credit',
        component : SubmissionCreditComponent,
        data : {
          title : 'Data Pengajuan Kredit'
        }
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FormRoutingModule { }
