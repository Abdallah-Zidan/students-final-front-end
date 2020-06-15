import { Component, OnInit } from '@angular/core';
import { HttpService } from '../../../services/http.service';
import { RegisterService } from "../register.service";
import { Router } from '@angular/router';


@Component({
  selector: 'app-email-verification',
  templateUrl: './email-verification.component.html',
  styleUrls: ['./email-verification.component.scss']
})
export class EmailVerificationComponent implements OnInit {
response;
token;
  constructor(
    private httpService:HttpService,
    private router:Router,
    private registerService:RegisterService
    ) { }

  ngOnInit(): void {
    this.registerService.currentToken.subscribe(
      res => {this.token = res})
      if(this.token==null)
      {
        this.token = localStorage.getItem('verifyToken');
        if(!this.token){
          this.router.navigate(['/']);
        }
        
      }
  }

  resendVerification()
  {
    this.httpService.verifyEmail(this.token).subscribe(
      result =>{
        if(result.status==200)
        {this.response="Already verified you need to login"
         setTimeout(() => {
          this.response = null;
          this.router.navigate(['/login']);
        }, 4000);
       
        }
        else if(result.status==204)
        {this.response="A new message has been sent to your email"}
        setTimeout(() => {
          this.response = null;
        }, 4000);
      },
      error =>{
        console.log(error);
      }
    )
    
  }

}
