import { Component, OnInit } from '@angular/core';
import { StorageService } from '../services/storage.service';
import { HttpService } from '../services/http.service';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  data;user;
  studyData;profileId;
  constructor(
    private storagService:StorageService,
    private httpService:HttpService,
    private activatedRoute:ActivatedRoute) {}
  

  ngOnInit(): void {

       this.activatedRoute.paramMap.subscribe(params => { 
         this.profileId = params.get('id'); 
       });
      
       this.user=this.storagService.getItem('user')
       
       this.httpService.getUser(this.profileId).subscribe(
        result =>{
          this.data=result.data;
          if(this.data.type=="Student")
          {      
            this.httpService.getuserDepartment().subscribe(
              result=>{
               this.studyData=result.data.department_faculties
              },
              error=>{console.log(error)}
            );
          
            if(this.data&&this.data.profile.year==0)
            {this.data.profile.year="Preparatory"}
          
          }
        },
        error =>{
          console.log(error);}
        );
}

}
