import { Injectable } from '@angular/core';
import { CommonService } from '../core-service/common.service';

@Injectable({
  providedIn: 'root'
})
export class ProductImageService {

  key = "product-image"
  constructor(private commonService : CommonService) { }

  add(data? : any){
    return this.commonService.RequestPost(this.key+"/add", data);
  }

}
