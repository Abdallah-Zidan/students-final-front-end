import { Component, OnInit } from '@angular/core';
import { StorageService } from '../../../services/storage.service';
import { HttpService } from '../../../services/http.service';


@Component({
  selector: 'app-email-verification',
  templateUrl: './email-verification.component.html',
  styleUrls: ['./email-verification.component.scss']
})
export class EmailVerificationComponent implements OnInit {

  constructor(private storagService:StorageService,private httpService:HttpService) { }

  ngOnInit(): void {
  }

  resendVerification()
  {
    let x= this.storagService.getItem('user')
    this.httpService.verifyEmail(x).subscribe(
      result =>{
        console.log(result.status)
      },
      error =>{
        console.log(error);
      }
    )
    
  }

}
