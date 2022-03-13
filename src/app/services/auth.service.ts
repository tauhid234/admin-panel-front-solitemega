import { Injectable } from '@angular/core';
import { CommonService } from './core-service/common.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  key = "auth";
  constructor(private commonService : CommonService) { }

  login(data? : any){
    return this.commonService.RequestPost(this.key+"/admin/login", data);
  }
  
}
