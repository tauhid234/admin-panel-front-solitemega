import { Component, OnInit, ViewChild } from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { Alert } from '../../../lib/alert';
import { CategoryService } from '../../../services/product/category.service';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss']
})
export class CategoryComponent implements OnInit {


  searching : any = {};
  input : any = {};
  update : any = {};
  data_category : any[]= [];

  @ViewChild("AddModal") public addModal : ModalDirective;
  @ViewChild("UpdateModal") public updateModal : ModalDirective;
  constructor(private categoryService : CategoryService, private alert : Alert) { }

  ngOnInit(): void {
    this.LoadData();
  }

  async LoadData(){

    let output = await this.categoryService.select().toPromise();
    if(output.data.length == 0){
      return;
    }

    this.data_category = output.data;

  }

  async Search(){

    let output = await this.categoryService.select(this.searching).toPromise();
    if(output.data.length == 0){
      // this.alert.showInfoMessage("Informasi", "Data tidak ditemukan");
      return;
    }

    this.alert.showSuccessMessage("Sukses", output.message);
    this.data_category = output.data;
  }

  Reset(){
    this.searching = {};
    this.data_category = [];
  }

  OpenModalUpdate(data : any){
    this.updateModal.show();
    this.update = data;
    console.log("UPDATE SHOW ",this.update);
  }

  async Delete(data : any){
    
    let deleted = await this.categoryService.delete(data).toPromise();
    if(deleted.status == "failed"){
      this.alert.showErrorMessage('Error', deleted.message);
      return;
    }

    this.alert.showSuccessMessage('Sukses', 'Data berhasil dihapus');
    this.update = {};
    this.updateModal.hide();
    this.LoadData();

  }

  async Save(){

    let output = await this.categoryService.add(this.input).toPromise();
    if(output.status == "failed"){
      this.alert.showErrorMessage("Gagal disimpan", output.message);
      return;
    }

    this.addModal.hide();
    this.alert.showSuccessMessage("Sukses", output.message);
    this.LoadData();
    
  }

  async Update(){

    let output = await this.categoryService.update(this.update).toPromise();
    if(output.status == "failed"){
      this.alert.showErrorMessage("Gagal diupdate", output.message);
      return;
    }

    this.updateModal.hide();
    this.alert.showSuccessMessage("Sukses", output.message);
    this.LoadData();

  }

}
