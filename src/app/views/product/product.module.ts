import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductRoutingModule } from './product-routing.module';
import { CategoryComponent } from './category/category.component';
import { FormsModule } from '@angular/forms';
import { ModalModule } from 'ngx-bootstrap/modal';
import { InventoryComponent } from './inventory/inventory.component';


@NgModule({
  declarations: [
    CategoryComponent,
    InventoryComponent
  ],
  imports: [
    CommonModule,
    ProductRoutingModule,
    FormsModule,
    ModalModule.forRoot()
  ]
})
export class ProductModule { }
