import { Component, OnInit } from '@angular/core';
import { Alert } from '../../../lib/alert';
import { UserService } from '../../../services/user/user.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {

  searching : any = {};

  data_user_profile : any[] = [];
  constructor(private userProfileService : UserService, private alert : Alert) { }

  ngOnInit(): void {
    this.loadData();
  }

  async loadData(){

    let output = await this.userProfileService.select().toPromise();
    if(output.data.length == 0){
      // this.alert.showInfoMessage("Informasi", "Data tidak ditemukan");
      return;
    }

    // this.alert.showSuccessMessage("Sukses", output.message);
    this.data_user_profile = output.data;

  }

  async Search(){
    let output = await this.userProfileService.select(this.searching).toPromise();
    if(output.data.length == 0){
      this.alert.showInfoMessage("Informasi", "Data tidak ditemukan");
      return;
    }

    this.alert.showSuccessMessage("Sukses", output.message);
    this.data_user_profile = output.data;

  }

  Reset(){
    this.searching = {};
    this.data_user_profile = [];
  }

}
