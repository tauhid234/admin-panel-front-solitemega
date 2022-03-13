import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CategoryComponent } from './category/category.component';

const routes: Routes = [
  {
    path : '',
    data : {
      title : 'Produk'
    },
    children : [
      {
        path : 'kategori',
        component : CategoryComponent,
        data : {
          title : 'Kategori'
        }
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductRoutingModule { }
