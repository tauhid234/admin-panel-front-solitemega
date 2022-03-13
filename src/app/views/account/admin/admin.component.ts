import { Component, OnInit, ViewChild } from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { Alert } from '../../../lib/alert';
import { AdminService } from '../../../services/admin/admin.service';
import { SessionService } from '../../../services/core-service/session.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {

  searching : any = {};
  update : any = {};
  input : any = {};
  data_admin : any[] = [];

  userId : any = {};

  @ViewChild("AddModal") public addModal : ModalDirective;
  @ViewChild("UpdateModal") public updateModal : ModalDirective;
  constructor(private adminService : AdminService, private alert : Alert,
              private session : SessionService) { }

  ngOnInit(): void {
    this.loadData();
    this.userId = this.session.getUserId();
  }

  async loadData(){

    let output = await this.adminService.select().toPromise();
    if(output.status == "failed"){
      this.alert.showInfoMessage("Info", output.message);
      return;
    }

    this.data_admin = output.data;

  }

  async Search(){

    let output = await this.adminService.select(this.searching).toPromise();
    if(output.status == "failed"){
      this.alert.showInfoMessage("Informasi", output.message);
      return;
    }

    this.alert.showSuccessMessage("Sukses", output.message);
    this.data_admin = output.data;

  }

  Reset(){
    this.searching = {};
    this.data_admin = [];
  }

  OpenModalUpdate(data : any){
    this.updateModal.show();
    this.update = data;
    console.log("UPDATE SHOW ",this.update);
  }

  async Delete(data : any){
    
    let deleted = await this.adminService.delete(data).toPromise();
    if(deleted.status == "failed"){
      this.alert.showErrorMessage('Error', deleted.message);
      return;
    }

    this.alert.showSuccessMessage('Sukses', 'Data berhasil dihapus');
    this.update = {};
    this.updateModal.hide();
    this.loadData();

  }

  async Save(){


    let output = await this.adminService.add(this.input).toPromise();
    if(output.status == "failed"){
      this.alert.showErrorMessage("Gagal Simpan", output.message);
      return;
    }

    this.addModal.hide();
    this.alert.showSuccessMessage("Sukses", output.message);
    this.loadData();

  }


  async Update(){

    let output = await this.adminService.update(this.update).toPromise();
    if(output.status == "failed"){
      this.alert.showErrorMessage("Gagal Update", output.message);
      return;
    }

    this.updateModal.hide();
    this.alert.showSuccessMessage("Sukses", output.message);
    this.loadData();
  }

}
