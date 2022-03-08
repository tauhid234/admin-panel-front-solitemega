import { Component, OnInit, ViewChild } from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { Alert } from '../../../lib/alert';
import { StatusPerkawinanService } from '../../../services/parameter/status-perkawinan.service';

@Component({
  selector: 'app-status-pernikahan',
  templateUrl: './status-pernikahan.component.html',
  styleUrls: ['./status-pernikahan.component.scss']
})
export class StatusPernikahanComponent implements OnInit {

  input : any = {};
  update : any = {};
  data_pernikahan : any = [];
  searching : any = {};

  @ViewChild("AddModal") public addModal : ModalDirective;
  @ViewChild("UpdateModal") public updateModal : ModalDirective;

  constructor(private perkawinanService : StatusPerkawinanService, private alert : Alert) { }

  ngOnInit(): void {
    this.loadData();
  }

  async Search(){

    let search : any = {};

    for(let key in this.searching){
      if(this.searching[key] == "" || this.searching[key] == null || this.searching[key] == "undefined" || this.searching[key] == undefined) continue;
      switch(key){
        case "kode_perkawinan" :
           search.kode_perkawinan = this.searching[key];
        break;
        case "nama_pendidikan" :
           search.nama_perkawinan = this.searching[key];
        break;
      }
    }

    let output = await this.perkawinanService.select(search).toPromise();
    if(output.status == "failed"){
      this.alert.showInfoMessage("Info", output.message);
      return;
    }

    this.alert.showSuccessMessage("Sukses", "Data berhasil ditemukan");
    this.data_pernikahan = output.data;
  }

  async Save(){
    
    if(this.input.kode_perkawinan == "" || this.input.kode_perkawinan == undefined ){
      this.alert.showWarningMessage('Peringatan', 'Kode Perkawinan Harus diisi');
      return;
    }

    if(this.input.nama_perkawinan == "" || this.input.nama_perkawinan == undefined ){
      this.alert.showWarningMessage('Peringatan', 'Nama Perkawinan Harus diisi');
      return;
    }

    let data = {
      kode_perkawinan : this.input.kode_perkawinan,
      nama_perkawinan : this.input.nama_perkawinan
    }

    let save = await this.perkawinanService.add(data).toPromise();
    if(save.status == "failed"){
      this.alert.showErrorMessage('Error', save.message);
      return;
    }

    this.alert.showSuccessMessage('Sukses', 'Data berhasil disimpan');
    this.input = {};
    this.addModal.hide();
    this.loadData();

  }
  
  async Update(){
    
    if(this.update.kode_perkawinan == "" || this.update.kode_perkawinan == undefined ){
      this.alert.showWarningMessage('Peringatan', 'Kode Perkawinan Harus diisi');
      return;
    }

    if(this.update.nama_perkawinan == "" || this.update.nama_perkawinan == undefined ){
      this.alert.showWarningMessage('Peringatan', 'Nama Perkawinan Harus diisi');
      return;
    }

    let data = {
      id : this.update.id,
      kode_perkawinan : this.update.kode_perkawinan,
      nama_perkawinan : this.update.nama_perkawinan
    }

    console.log("DATA UPDATE ",data);
    let updates = await this.perkawinanService.update(data).toPromise();
    if(updates.status == "failed"){
      this.alert.showErrorMessage('Error', updates.message);
      return;
    }

    this.alert.showSuccessMessage('Sukses', 'Data berhasil diubah');
    this.update = {};
    this.updateModal.hide();
    this.loadData();

  }
  
  async Delete(data : any){
    
    let deleted = await this.perkawinanService.delete(data).toPromise();
    if(deleted.status == "failed"){
      this.alert.showErrorMessage('Error', deleted.message);
      return;
    }

    this.alert.showSuccessMessage('Sukses', 'Data berhasil dihapus');
    this.update = {};
    this.updateModal.hide();
    this.Reset();

  }

  Reset(){
    this.input = {};
    this.update = {};
    this.searching = {};
    this.data_pernikahan = [];
  }

  OpenModalUpdate(data : any){
    this.updateModal.show();
    this.update = data;
    console.log("UPDATE SHOW ",this.update);
  }

  async loadData(){

    let output = await this.perkawinanService.select().toPromise();
    if(output.status == "failed"){
      this.alert.showInfoMessage("Info", output.message);
      this.data_pernikahan = [];
      return;
    }

    this.data_pernikahan = output.data;

  }

}
