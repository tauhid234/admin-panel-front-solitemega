import { Injectable } from "@angular/core"
import Swal from "sweetalert2"


@Injectable({
    providedIn: 'root'
})
export class Alert {

    showSuccessMessage(title, message){
        return Swal.fire({
          title: title,
          timer : 2000,
          text: message,
          icon: 'success',
          showConfirmButton : false
        })
    }

    showInfoMessage(title, message){
        return Swal.fire({
          title: title,
          timer : 2000,
          text: message,
          icon: 'info',
          showConfirmButton : false
        })
    }
    
    showWarningMessage(title, message){
        return Swal.fire({
          title: title,
          timer : 2000,
          text: message,
          icon: 'warning',
          showConfirmButton : false
        })
    }
    
    showErrorMessage(title, message){
        return Swal.fire({
          title: title,
          timer : 2000,
          text: message,
          icon: 'error',
          showConfirmButton : false
        })
    }
}
