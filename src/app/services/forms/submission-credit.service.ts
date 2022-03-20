import { Injectable } from '@angular/core';
import { CommonService } from '../core-service/common.service';

@Injectable({
  providedIn: 'root'
})
export class SubmissionCreditService {

  key = "submission-credit";

  constructor(private commonService : CommonService) { }

  select(data? : any){
    return this.commonService.RequestPost(this.key+"/select", data);
  }
}
