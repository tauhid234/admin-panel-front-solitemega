import { Component, OnInit, ViewChild } from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { Alert } from '../../../lib/alert';
import { CategoryService } from '../../../services/product/category.service';
import { InventoryService } from '../../../services/product/inventory.service';
import { ProductImageService } from '../../../services/product/product-image.service';

@Component({
  selector: 'app-inventory',
  templateUrl: './inventory.component.html',
  styleUrls: ['./inventory.component.scss']
})
export class InventoryComponent implements OnInit {


  @ViewChild("AddModal") public addModal : ModalDirective;
  @ViewChild("UpdateModal") public updateModal : ModalDirective;

  searching : any = {};
  input : any = {};
  update : any = {};
  data_produk : any[]= [];

  data_category : any[] = [];
  upload : any = {};

  constructor(private categoryService : CategoryService, private alertService : Alert,
              private productService : InventoryService, private imageProductService : ProductImageService) { }

  ngOnInit(): void {
    this.loadcategory();
    this.loadProduct();
  }

  async loadProduct(){
    let output = await this.productService.select().toPromise();
    if(output.status == "failed"){
      return;
    }

    this.data_produk = output.data;
  }


  async loadcategory(){
    let output = await this.categoryService.select().toPromise();
    if(output.length == 0){
      this.alertService.showInfoMessage("Informasi", output.message);
      return;
    }

    this.data_category = output.data;

  }


  HitungCicilan(){

    let numberPattern = new RegExp('^[0-9]*$');

    if(!this.input.harga_barang.match(numberPattern)){
      this.alertService.showWarningMessage("Peringatan", "Harap inputkan hanya angka");
      this.input.harga_barang = "";
      this.input.cicilan6_bulan = "";
      this.input.cicilan8_bulan = "";
      this.input.cicilan10_bulan = "";
      this.input.cicilan15_bulan = "";
      this.input.cicilan18_bulan = "";
      return;
    }

    let cicilan6 = Number(this.input.harga_barang) / 6;
    let cicilan8 = Number(this.input.harga_barang) / 8;
    let cicilan10 = Number(this.input.harga_barang) / 10;
    let cicilan15 = Number(this.input.harga_barang) / 15;
    let cicilan18 = Number(this.input.harga_barang) / 18;

    this.input.cicilan6_bulan = Math.round(cicilan6);
    this.input.cicilan8_bulan = Math.round(cicilan8);
    this.input.cicilan10_bulan = Math.round(cicilan10);
    this.input.cicilan15_bulan = Math.round(cicilan15);
    this.input.cicilan18_bulan = Math.round(cicilan18);
  }


  ValidateUangMuka(){
    let numberPattern = new RegExp('^[0-9]*$');

    if(!this.input.uang_muka.match(numberPattern)){
      this.alertService.showWarningMessage("Peringatan", "Harap inputkan hanya angka");
      this.input.uang_muka = "";
      return;
    }
  }

  async UploadFoto(event){
    if(event.target.files.length > 0) 
    {
      if(event.target.files[0].type != "image/png"){
        this.alertService.showWarningMessage("Peringatan", "File harus berformat PNG");
        this.input.foto = "";
        return;
      }
      this.upload = event.target.files[0];
      console.log(event.target.files[0].name);
    }
  }


  async Search(){

    let output = await this.productService.select(this.searching).toPromise();
    if(output.data.length == 0){
      this.alertService.showInfoMessage("Informasi", "Data tidak ditemukan");
      return;
    }

    this.alertService.showSuccessMessage("Sukses", output.message);
    this.data_produk = output.data;
    
  }

  Reset(){
    this.searching = {};
    this.input = {};
    this.update = {};
    this.data_produk = [];
  }

  async Save(){

    if(this.input.kategori_barang == undefined || this.input.kategori_barang.kode_kategori == undefined){
      this.alertService.showWarningMessage("Peringatan", "Kategori barang belum dipilih");
      return;
    }

    let saved = {
      kode_kategori : this.input.kategori_barang.kode_kategori,
      judul_produk : this.input.nama_barang,
      harga_asli : this.input.harga_barang,
      uang_muka : this.input.uang_muka,
      deskripsi : this.input.deskripsi,
      keterangan_produk : this.input.keterangan_produk,
      cicilan6_bulan : this.input.cicilan6_bulan?.toString(),
      cicilan8_bulan : this.input.cicilan8_bulan?.toString(),
      cicilan10_bulan : this.input.cicilan10_bulan?.toString(),
      cicilan15_bulan : this.input.cicilan15_bulan?.toString(),
      cicilan18_bulan : this.input.cicilan18_bulan?.toString()
    }
    
    console.log("OUTPUT SAVE ",saved);

    let output = await this.productService.add(saved).toPromise();
    if(output.status == "failed"){
      this.alertService.showErrorMessage("Error", output.message);
      return;
    }


      let file = this.upload;
      let form = new FormData();
      form.append("image", file, file.name);
      form.append("id_produk", output.data.id);
      

      let output_file = await this.imageProductService.add(form).toPromise();
      if(output.status == "failed"){
        this.alertService.showErrorMessage("Error", output_file.message);
        return;
      } 

    this.addModal.hide();
    this.alertService.showSuccessMessage("Sukses", output.message);
    this.input = {};
    this.loadProduct();
    
  }


  async OpenModalUpdate(data : any){

  }

  async Delete(data : any){

  }

}
