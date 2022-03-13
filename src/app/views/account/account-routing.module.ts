import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './admin/admin.component';
import { UserProfileComponent } from './user-profile/user-profile.component';

const routes: Routes = [
  {
    path : '',
    data : {
      title : 'Akun'
    },
    children : [
      {
        path : 'admin',
        component : AdminComponent,
        data : {
          title : 'Admin'
        }
      },
      {
        path : 'user-profile',
        component : UserProfileComponent,
        data : {
          title : 'User Profile'
        }
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AccountRoutingModule { }
