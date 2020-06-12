import { Component, OnInit } from '@angular/core';
import { HttpService } from '../../services/http.service';
import { AuthService } from '../../auth/services/auth.service';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { StorageService } from '../../services/storage.service';
import { User } from '../../auth/user.model';


@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.scss']
})
export class UpdateComponent implements OnInit {

 
  universityList = [];
  departmentList =[];
  facultyList=[];
  errorList=[];
  bodValidation;
  flag;
  data;
  storageData;
  userForm: FormGroup;companyForm: FormGroup;studentForm: FormGroup; TeachingStaffForm: FormGroup;
  imageValidation="0";
  constructor(
    private authService: AuthService,
    private httpService:HttpService,
    private fb: FormBuilder,
    private router:Router,
    private storagService:StorageService,
 ) 
    {
    let userFormControls = {
      name : new FormControl('',[
        Validators.required,
        Validators.pattern("[A-Za-z .'-]+"),
        Validators.minLength(6)
      ]),

      address : new FormControl('',[
        Validators.required,
      ]),

      phone: new FormControl('',[
        Validators.required,
        Validators.pattern("[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,8}"),
        Validators.minLength(11),
        Validators.maxLength(15)
      ]),
      type : new FormControl(''),
      avatar: new FormControl(''),
    }
    let studentFormControls={
      
      birthdate : new FormControl('',[
        Validators.required]),

      }
      

      let companyFormControls={
      website: new FormControl('',[
        Validators.required,
        Validators.pattern("((http|https)+://)+([\\da-z.-]+)\\.([a-z.]{2,6})[/\\w .-]*/?\\.([a-z.]{2,6})[/\\w .-]*/?")
      ]),

      fax: new FormControl('',[
        Validators.pattern("[+]{1}[0-9]{10,14}"),
        Validators.maxLength(15),
        Validators.required,

      ]),
      description: new FormControl('',[
        Validators.required,
        Validators.maxLength(250),

      ]),

    }

    let TeachingStaffFormControls={
      birthdate : new FormControl(''),

      scientific_certificates : new FormControl('',[
        Validators.required,
        Validators.pattern("[A-Za-z0-9 .'-]+"),
        Validators.minLength(10)
      ]),

    }
  
    this.userForm = this.fb.group(userFormControls);
    this.companyForm = this.fb.group(companyFormControls);
    this.studentForm = this.fb.group(studentFormControls);
    this.TeachingStaffForm=this.fb.group(TeachingStaffFormControls);


   }

  ngOnInit(): void {
    this.httpService.getUniversites().subscribe(
      result =>{
        this.universityList = result.data.universities;
      },
      error =>{
        console.log(error);
      }
    )
    this.storageData= this.storagService.getItem('user')
    if(this.storageData)
     {
    this.httpService.getUser().subscribe(
      result =>{
        this.data=result.data;

        this.userForm.patchValue({
          name:this.data.name,
          phone:this.data.mobile,
          address:this.data.address,
          avatar:this.data.avatar,
          type:this.data.type,});

          if(this.data.type=="Student")
          {
          this.studentForm.patchValue({
          birthdate:this.data.profile.birthdate,
           });
          }

          
          if(this.data.type=="Company")
          {
          this.companyForm.patchValue({
          fax:this.data.profile.fax,
          website:this.data.profile.website,
          description:this.data.profile.description,
          });
         }

         if(this.data.type=="TeachingStaff")
         {
         this.TeachingStaffForm.patchValue({
         birthdate:this.data.profile.birthdate,
         scientific_certificates:this.data.profile.scientific_certificates
          });
         }
      },
      error =>{
        console.log(error);
      }
    )

    
  }}
  

  get name() { return this.userForm.get('name') }
  get phone() { return this.userForm.get('phone') }
  get address() { return this.userForm.get('address') }
  get avatar() { return this.userForm.get('avatar') }

  get birthdate() { return this.studentForm.get('birthdate') }

  get fax() { return this.companyForm.get('fax') }
  get website() { return this.companyForm.get('website') }
  get description() { return this.companyForm.get('description') }

  get staff_birthdate() { return this.TeachingStaffForm.get('birthdate') }
  get scientific_certificates() { return this.TeachingStaffForm.get('scientific_certificates') }


  onFileChange(event) {
    if (event.target.files.length > 0 )
    {
      const file = event.target.files[0];
      if(file.type.match(/image\/*/) != null)
      {
       document.getElementById('image').setAttribute('src',window.URL.createObjectURL(file))
       this.imageValidation="";
       this.flag=1;
       this.userForm.patchValue({avatar: file});
       return true
      }
        this.flag=0;
        this.imageValidation="invalid file , please select Image"
        return false;
    }
    else{
      this.flag=1;
      this.imageValidation="0";}
  }

  date(e) {
    let birthDate = new Date(e.target.value).getFullYear()
    let today = new Date().getFullYear()
    if((today - birthDate) >18 && (today - birthDate) < 60)
        {
          this.bodValidation = "";
          this.flag=1;
          return true;
        }
    else
        { 
          this.bodValidation = "Invalid Birthdate";
          this.flag=0;
          return false;
        }
  }


  updateProfile()
  {
    let user = new FormData();
    user.append('name', this.userForm.get('name').value);
    user.append('mobile', this.userForm.get('phone').value);
    user.append('address', this.userForm.get('address').value);
    user.append('type', this.userForm.get('type').value);
    if(this.imageValidation!="0")
      {user.append('avatar', this.userForm.get('avatar').value);}
    
    if(this.storageData.type=="Student")
    {
    user.append('birthdate', this.studentForm.get('birthdate').value);
    }

    if(this.storageData.type=="Company")
    {
     user.append('fax', this.companyForm.get('fax').value);
     user.append('website', this.companyForm.get('website').value);
     user.append('description', this.companyForm.get('description').value);
    }

    if(this.storageData.type=="TeachingStaff")
    {
     user.append('birthdate', this.TeachingStaffForm.get('birthdate').value);
     user.append('scientific_certificates', this.TeachingStaffForm.get('scientific_certificates').value);
    }
    user.append('_method', 'PUT');  

    let token=this.storagService.getItem('user')._token
    this.httpService.updateProfile(user).subscribe(

      res=>{
        this.httpService.getUser().subscribe(
          result =>
            {const currentUser = new User(
              result.data.id,
              result.data.name,
              result.data.email,
              result.data.type,
              result.data.address,
              result.data.mobile,
              result.data.avatar,
              result.data.verified,
              token
            );
              this.storagService.removeItem('user')
              this.storagService.saveItem('user', currentUser);
              this.router.navigate(['/profile']);},
           error=>{console.log(error)}
               );
             },
      err=>{
              console.log(err) 
           }
    )
  }
}

