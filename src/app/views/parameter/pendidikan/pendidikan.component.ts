import { Component, OnInit, ViewChild } from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { PendidikanService } from '../../../services/parameter/pendidikan.service';

import Swal from 'sweetalert2';
import { Alert } from '../../../lib/alert';

@Component({
  selector: 'app-pendidikan',
  templateUrl: './pendidikan.component.html',
  styleUrls: ['./pendidikan.component.scss']
})
export class PendidikanComponent implements OnInit {

  input : any = {};
  update : any = {};
  data_pendidikan : any = [];
  searching : any = {};

  @ViewChild("AddModal") public addModal : ModalDirective;
  @ViewChild("UpdateModal") public updateModal : ModalDirective;

  constructor(private pendidikanService : PendidikanService, private alert : Alert) { }

  ngOnInit(): void {
    this.loadData();
  }

  async Search(){

    let search : any = {};

    for(let key in this.searching){
      if(this.searching[key] == "" || this.searching[key] == null || this.searching[key] == "undefined" || this.searching[key] == undefined) continue;
      switch(key){
        case "kode_pendidikan" :
           search.kode_pendidikan = this.searching[key];
        break;
        case "nama_pendidikan" :
           search.nama_pendidikan = this.searching[key];
        break;
      }
    }

    let output = await this.pendidikanService.select(search).toPromise();
    if(output == false){
      this.alert.showInfoMessage("Info", output);
      return;
    }

    this.alert.showSuccessMessage("Sukses", "Data berhasil ditemukan");
    this.data_pendidikan = output.data;
  }

  async Save(){
    
    if(this.input.kode_pendidikan == "" || this.input.kode_pendidikan == undefined ){
      this.alert.showWarningMessage('Peringatan', 'Kode Pendidikan Harus diisi');
      return;
    }

    if(this.input.nama_pendidikan == "" || this.input.nama_pendidikan == undefined ){
      this.alert.showWarningMessage('Peringatan', 'Nama Pendidikan Harus diisi');
      return;
    }

    let data = {
      kode_pendidikan : this.input.kode_pendidikan,
      nama_pendidikan : this.input.nama_pendidikan
    }

    let save = await this.pendidikanService.add(data).toPromise();
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
    
    console.log("UPDATE ", this.update);
    if(this.update.kode_pendidikan == "" || this.update.kode_pendidikan == undefined ){
      this.alert.showWarningMessage('Peringatan', 'Kode Pendidikan Harus diisi');
      return;
    }

    if(this.update.nama_pendidikan == "" || this.update.nama_pendidikan == undefined ){
      this.alert.showWarningMessage('Peringatan', 'Nama Pendidikan Harus diisi');
      return;
    }

    let data = {
      id : this.update.id,
      kode_pendidikan : this.update.kode_pendidikan,
      nama_pendidikan : this.update.nama_pendidikan
    }

    let updates = await this.pendidikanService.update(data).toPromise();
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
    
    let deleted = await this.pendidikanService.delete(data).toPromise();
    if(deleted.status == "failed"){
      this.alert.showErrorMessage('Error', deleted.message);
      return;
    }

    this.alert.showSuccessMessage('Sukses', 'Data berhasil dihapus');
    this.update = {};
    this.updateModal.hide();
    this.loadData();

  }

  Reset(){
    this.input = {};
    this.searching = {};
    this.data_pendidikan = [];
  }

  OpenModalUpdate(data : any){
    this.updateModal.show();
    this.update = data;
    console.log("UPDATE SHOW ",this.update);
  }

  async loadData(){

    let output = await this.pendidikanService.select().toPromise();
    if(output.status == "failed"){
      this.alert.showInfoMessage("Info", output.message);
      return;
    }

    this.data_pendidikan = output.data;

  }


}
