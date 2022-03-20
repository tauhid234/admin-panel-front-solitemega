import { Component, OnInit } from '@angular/core';
import { Alert } from '../../../lib/alert';
import { SubmissionCreditService } from '../../../services/forms/submission-credit.service';

@Component({
  selector: 'app-submission-credit',
  templateUrl: './submission-credit.component.html',
  styleUrls: ['./submission-credit.component.scss']
})
export class SubmissionCreditComponent implements OnInit {


  searching : any = {};
  data_submission : any[] = [];

  constructor(private submissionCreditService : SubmissionCreditService, private alertService : Alert) { }

  ngOnInit(): void {
    this.loadSubmission();
  }

  async loadSubmission(){
    let output = await this.submissionCreditService.select().toPromise();
    if(output.data.length == 0){
      // this.alertService.showInfoMessage("Informasi", "Data tidak ditemukan");
      return
    }
    this.data_submission = output.data;
  }


  async Search(){

    let output = await this.submissionCreditService.select(this.searching).toPromise();
    if(output.data.length == 0){
      this.alertService.showInfoMessage("Informasi", "Data tidak ditemukan");
      return;
    }

    this.alertService.showSuccessMessage("Sukses", output.message);
    this.data_submission = output.data;
  }

  Reset(){
    this.searching = {};
    this.data_submission = [];
  }

}
