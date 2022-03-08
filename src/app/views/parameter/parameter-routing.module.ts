import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PendidikanComponent } from './pendidikan/pendidikan.component';
import { StatusPernikahanComponent } from './status-pernikahan/status-pernikahan.component';

const routes: Routes = [
  {
  path : '',
    data : {
      title : 'Parameter'
    },
    children : [
      {
        path : 'pendidikan',
        component : PendidikanComponent,
        data : {
          title : 'Pendidikan'
        }
      },
      {
        path : 'status-pernikahan',
        component : StatusPernikahanComponent,
        data : {
          title : 'Status Pernikahan'
        }
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ParameterRoutingModule { }
