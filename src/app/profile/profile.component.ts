import { Component, OnInit } from '@angular/core';
import { StorageService } from '../services/storage.service';
import { HttpService } from '../services/http.service';



@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  data;
  studyData;
  constructor(private storagService:StorageService,private httpService:HttpService) {}
  

  ngOnInit(): void {
    let user= this.storagService.getItem('user')
    if(user)
    {this.httpService.getUser().subscribe(
      result =>{
        this.data=result.data;
      },
      error =>{
        console.log(error);}
     ) }
      if(user.type=="Student")
      {      
        this.httpService.getuserDepartment().subscribe(
          result=>{
           this.studyData=result.data.department_faculties
          },
          error=>{console.log(error)}
        )
      
        if(this.data&&this.data.profile.year==0)
        {this.data.profile.year="Preparatory"}
      
      }
    
  }}

