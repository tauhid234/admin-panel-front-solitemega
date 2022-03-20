import { Injectable } from '@angular/core';
import { CommonService } from '../core-service/common.service';

@Injectable({
  providedIn: 'root'
})
export class InventoryService {

  key = "goods";
  constructor(private commonService : CommonService) { }

  add(data? : any){
    return this.commonService.RequestPost(this.key+"/add", data);
  }

  select(data? : any){
    return this.commonService.RequestPost(this.key+"/select", data);
  }
}
