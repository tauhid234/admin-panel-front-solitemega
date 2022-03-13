import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Alert } from '../../lib/alert';
import { AuthService } from '../../services/auth.service';
import { SessionService } from '../../services/core-service/session.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: 'login.component.html'
})
export class LoginComponent implements OnInit {


  input : any = {};

  constructor(private session : SessionService, private auth : AuthService,
              private alert : Alert, private router : Router){}

  ngOnInit(): void {
      
  }

  async Login(){

    console.log("INPUT ",this.input);
    let output = await this.auth.login(this.input).toPromise();
    if(output.status == "failed"){
      this.alert.showErrorMessage("Login Gagal", output.message);
      return;
    }

    this.alert.showSuccessMessage("Sukses", output.message);
    
    this.session.setUserId(output.data.id);
    this.router.navigate(['/dashboard']);
  }
 }
