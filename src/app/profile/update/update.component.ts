import { Component, OnInit } from '@angular/core';
import { HttpService } from '../../services/http.service';
import { AuthService } from '../../auth/services/auth.service';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { StorageService } from '../../services/storage.service';



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
  userForm: FormGroup;companyForm: FormGroup;studentForm: FormGroup;
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
        Validators.pattern("[a-z .'-]+"),
        Validators.minLength(6)
      ]),

      address : new FormControl('',[
        Validators.required,
      ]),

      phone: new FormControl('',[
        Validators.required,
        Validators.pattern("[0-9]+"),
        Validators.minLength(11),
        Validators.maxLength(15)
      ]),
      type : new FormControl(''),
      avatar: new FormControl(''),
    }
    let studentFormControls={
      // university : new FormControl('',[
      //   Validators.required,
      // ]),

      // faculty : new FormControl('',[
      //   Validators.required,
      // ]),

      // department : new FormControl('',[
      //   Validators.required,
      // ]),

      // level : new FormControl('',[
      //   Validators.required,
      // ]),

      

      birthdate : new FormControl('',[
        Validators.required]),

      }

      let companyFormControls={
      website: new FormControl('',[
        Validators.required,
        Validators.pattern("(https+://)+([\\da-z.-]+)\\.([a-z.]{2,6})[/\\w .-]*/?\\.([a-z.]{2,6})[/\\w .-]*/?")
      ]),

      fax: new FormControl('',[
        Validators.pattern("[+]{1}20[0-9]{8,11}"),
        Validators.maxLength(15),
        Validators.required,

      ]),
      description: new FormControl('',[
        Validators.required,
        Validators.maxLength(250),

      ]),
     
    }
  
    this.userForm = this.fb.group(userFormControls);
    this.companyForm = this.fb.group(companyFormControls);
    this.studentForm = this.fb.group(studentFormControls);


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
    this.httpService.getUser(this.storageData).subscribe(
      result =>{
        this.data=result.data;

        this.userForm.patchValue({
          name:this.data.name,
          phone:this.data.mobile,
          address:this.data.address,
          avatar:this.data.avatar,
          type:this.data.type,});

          this.studentForm.patchValue({
          birthdate:this.data.profile.birthdate,
          // level:this.data.profile.year,
          });

          this.companyForm.patchValue({
          fax:this.data.profile.fax,
          website:this.data.profile.website,
          description:this.data.profile.description,
        });
      },
      error =>{
        console.log(error);
      }
    )

    // if(this.storageData.type=="Student")
    // {
    //   let studyData
    //   this.httpService.getuserDepartment(this.storageData).subscribe(
    //     result=>{
    //      studyData=result.data.department_faculties
    //      console.log(studyData)
    //       this.userForm.patchValue({
    //         university:studyData[0].faculty.university.id,
    //         faculty:studyData[0].faculty.id,
    //         department:studyData[0].department.id,
    //       });
    //     },
    //     error=>{console.log(error)}
    //   )
    // }

    
    
  }}
  

  get name() { return this.userForm.get('name') }
  get phone() { return this.userForm.get('phone') }
  get address() { return this.userForm.get('address') }
  get avatar() { return this.userForm.get('avatar') }

  get birthdate() { return this.studentForm.get('birthdate') }
  // get university() { return this.studentForm.get('university') }
  // get faculty() { return this.studentForm.get('faculty') }
  // get department() { return this.studentForm.get('department') }
  // get level() { return this.studentForm.get('level') }

  get fax() { return this.companyForm.get('fax') }
  get website() { return this.companyForm.get('website') }
  get description() { return this.companyForm.get('description') }

  onFileChange(event) {
    console.log(event.target.value)
    if (event.target.files.length > 0 )
    {
      const file = event.target.files[0];
      if(file.type.match(/image\/*/) != null)
      {
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

  // changeFacultyList(e)
  // {
  //     if(this.universityList.length>0 &&this.university.value>=0)
  //  { this.facultyList=[]
  //   this.departmentList=[]
  //   this.studentForm.patchValue({faculty: null,department: null});
  //   let id=this.university.value
  //   console.log(id)
  //   let index
  //   for(let i=0;i<this.universityList.length;i++)
  //   {if(this.universityList[i].id==id)
  //       {index=i;
  //         break;
  //       }
  //   }
  //   this.facultyList=this.universityList[index].faculties
  //  }
  // }

  // changeDepartmentList(e)
  // {
  //   if(this.facultyList.length>0)
  //   {this.departmentList=[]
  //   this.studentForm.patchValue({department: null});
  //   let id=this.faculty.value
  //   let index
  //   for(let i=0;i<this.facultyList.length;i++)
  //   {if(this.facultyList[i].id==id)
  //       {index=i;
  //         break;
  //       }
  //   }
  //   this.departmentList=this.facultyList[index].departments}
  // }

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
    // user.append('university', this.studentForm.get('university').value);
    // user.append('faculty', this.studentForm.get('faculty').value);
    // user.append('department', this.studentForm.get('department').value);
    // user.append('year', this.studentForm.get('level').value);
    user.append('birthdate', this.studentForm.get('birthdate').value);
    }

    if(this.storageData.type=="Company")
    {
     user.append('fax', this.companyForm.get('fax').value);
     user.append('website', this.companyForm.get('website').value);
     user.append('description', this.companyForm.get('description').value);
    }
    user.append('_method', 'PUT');    
    
    this.httpService.updateProfile(user,this.storageData).subscribe(
      res=>{
            this.router.navigate(['/profile']);
           },

      err=>{
              console.log(err) 
           }
    )
  }
}

