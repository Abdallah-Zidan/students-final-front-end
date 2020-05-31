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
    {this.httpService.getUser(user).subscribe(
      result =>{
        console.log(result)
        this.data=result.data;
        console.log(this.data.profile.year)
      },
      error =>{
        console.log(error);}
     ) }
      if(user.type=="Student")
      {
      
        this.httpService.getuserDepartment(user).subscribe(
          result=>{
           this.studyData=result.data.department_faculties
          },
          error=>{console.log(error)}
        )}
    
  }}

