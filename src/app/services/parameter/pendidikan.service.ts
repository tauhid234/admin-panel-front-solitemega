import { Injectable } from '@angular/core';
import { CommonService } from '../core-service/common.service';

@Injectable({
  providedIn: 'root'
})
export class PendidikanService {

  key = "pendidikan";
  constructor(private commonService : CommonService) { }

  add(data? : any){
    return this.commonService.RequestPost(this.key+"/add", data);
  }

  select(data? : any){
    return this.commonService.RequestPost(this.key+"/select", data);
  }

  update(data? : any){
    return this.commonService.RequestPost(this.key+"/update", data);
  }

  delete(data? : any){
    return this.commonService.RequestPost(this.key+"/delete", data);
  }
}
