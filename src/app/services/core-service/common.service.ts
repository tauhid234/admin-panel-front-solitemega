import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Alert } from '../../lib/alert';
import { SessionService } from './session.service';

@Injectable({
  providedIn: 'root'
})
export class CommonService {

  constructor(private http : HttpClient, private sessionService : SessionService, private alert : Alert) { }

  public RequestPost(key : any, data : any) : Observable<any>{
    return new Observable(observer =>{
      const url = `${this.sessionService.server}/${key}`;
      console.debug(key,data);

      let request = this.http.post(url, data);
      request.subscribe((response : any) => {
        console.debug("post",url, response);
        const json = { "status": response.status, "message": response.message};

        console.log(json);
        if(response.status == "failed"){

          if(response.code == 200 && response.message == "200 - Token expired !"){
            console.log(response.message);
            // this.toastr.error("Session anda sedang dipakai pada browser lain, Harap melakukan login kembali", "SESSION EXPIRED");
            // this.sessionService.GotoSignIn();
            return;
          }
          
          if(response.code == 200){
            // this.toastr.error(response.message, "Error",{disableTimeOut : true});
          }

          if(response.code == 404){
            console.log("GAK ADA APAAN");
          }

          if(response.code == 400){
            console.log("BAD REQUEST");
          }

          observer.next(response);
          observer.complete();
          return (observer).unsubscribe();

        }

        observer.next(response);
        observer.complete();
        return (observer).unsubscribe();

      }, error => {

        console.debug("post - ERROR",url, error);
        const json = {"status" : error.status, "message" : error.error.data};
        console.log(json);

         if(error.status == "404"){
           this.alert.showInfoMessage('Info', error.error.message);
        }

         if(error.status == "400"){
           this.alert.showInfoMessage('Info', error.error.message);
        }

         if(error.status == "404"){
          console.log("Data is Not Found, Please try again");
        }

        if(error.status == "500"){
          // this.toastr.error(error.error.message, "ERROR");
        }

          observer.error(error);
          observer.complete();
          // return (observer).unsubscribe();
         throw error;
      })
    })
  }
}
