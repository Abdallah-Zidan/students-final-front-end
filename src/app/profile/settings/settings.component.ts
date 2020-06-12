import { Component, OnInit } from '@angular/core';
import { HttpService } from '../../services/http.service';
import { AuthService } from '../../auth/services/auth.service';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { StorageService } from '../../services/storage.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {
  userForm: FormGroup
  error;
  success;
  data;
  user;
  constructor( private authService: AuthService,
    private httpService:HttpService,
    private fb: FormBuilder,
    private router:Router,
    private storagService:StorageService) {
      let userFormControls = {
        oldPassword: new FormControl('',[
          Validators.required,
        ]),
        NewPassword: new FormControl('',[
          Validators.required,
          Validators.minLength(8),
          Validators.maxLength(30),
          Validators.pattern("(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}")
        ]),
        reNewPassword: new FormControl('',[
          Validators.required,
        ]),

      }
      this.userForm = this.fb.group(userFormControls);

     }

  ngOnInit(): void {
  }

  get oldPassword() { return this.userForm.get('oldPassword') }
  get NewPassword() { return this.userForm.get('NewPassword') }
  get reNewPassword() { return this.userForm.get('reNewPassword') }

  changePassword() {
    this.userForm.patchValue({_method: "put"});
    this.user= this.storagService.getItem('user')
    if(this.user)
    {
   this.httpService.getUser(null).subscribe(
     result =>{
       this.data=result.data;
     },
     error =>{
       console.log(error);
     })}
    
    let user = new FormData();
    user.append('password' ,this.userForm.get('oldPassword').value);
    user.append('new_password',this.userForm.get('NewPassword').value,);
    user.append('_method', 'PUT');    
    
    
    this.httpService.updateProfile(user).subscribe(
      res=>{
           this.success="Password changed successfully,You must login again to continue"
           setTimeout(() => {
            this.success = null;
           }, 4000);
           this.authService.logout();
           },

      err=>{
              console.log(err) 
              this.error="Sorry, we could not change your password,Make sure you entered your password correctly"
              setTimeout(() => {
                this.error = null;
               }, 4000);
           }
    )
  }
}
