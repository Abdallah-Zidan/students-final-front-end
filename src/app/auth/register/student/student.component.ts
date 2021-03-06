import { Component, OnInit } from '@angular/core';
import { HttpService } from '../../../services/http.service';
import { AuthService } from '../../services/auth.service';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { RegisterService } from "../register.service";



@Component({
  selector: 'app-student',
  templateUrl: './student.component.html',
  styleUrls: ['./student.component.scss']
})
export class StudentComponent implements OnInit {
  universityList = [];
  departmentList =[];
  facultyList=[];
  errorList=[];
  departments=[];
  bodValidation;
  flag;
  studentForm: FormGroup
  constructor(
    private authService: AuthService,
    private httpService:HttpService,
    private fb: FormBuilder,
    private router:Router,
    private registerService:RegisterService) 

    {
    let studentformControls = {
      name : new FormControl('',[
        Validators.required,
        Validators.pattern("[A-Za-z .'-]+"),
        Validators.minLength(6)
      ]),

      email: new FormControl('',[
        Validators.required,
        Validators.pattern("[A-Za-z0-9._%-]+@[A-Za-z0-9._%-]+\\.edu.eg")
      ]),
      password: new FormControl('',[
        Validators.required,
        Validators.minLength(8),
        Validators.maxLength(30),
        Validators.pattern("(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}")
      ]),
      repassword: new FormControl('',[
        Validators.required,
      ]),

      university : new FormControl('',[
        Validators.required,
      ]),

      faculty : new FormControl('',[
        Validators.required,
      ]),

      department1 : new FormControl('',[
        Validators.required,
      ]),
      department2 : new FormControl(''),

      level : new FormControl('',[
        Validators.required,
      ]),

      address : new FormControl('',[
        Validators.required,
      ]),

      birthdate : new FormControl('',[
        Validators.required]),

      phone: new FormControl('',[
        Validators.required,
        Validators.pattern("[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,8}"),
        Validators.minLength(11),
        Validators.maxLength(15)
      ]),

      gender : new FormControl('',[
        Validators.required]),
      type : new FormControl(''),
      departments : new FormControl(''),

    }
    
    this.studentForm = this.fb.group(studentformControls);

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
    
  }

  get name() { return this.studentForm.get('name') }
  get phone() { return this.studentForm.get('phone') }
  get email() { return this.studentForm.get('email') }
  get password() { return this.studentForm.get('password') }
  get repassword() { return this.studentForm.get('repassword') }
  get birthdate() { return this.studentForm.get('birthdate') }
  get university() { return this.studentForm.get('university') }
  get faculty() { return this.studentForm.get('faculty') }
  get department1() { return this.studentForm.get('department1') }
  get department2() { return this.studentForm.get('department2') }
  get level() { return this.studentForm.get('level') }
  get address() { return this.studentForm.get('address') }
  get gender() { return this.studentForm.get('gender') }


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

  changeFacultyList(e)
  { 
    this.facultyList=[]
    this.departmentList=[]
    this.studentForm.patchValue({faculty: null,department1: null,department2: null});
    let id=e.target.value
    let index
    for(let i=0;i<this.universityList.length;i++)
    {if(this.universityList[i].id==id)
        {index=i;
          break;
        }
    }
    this.facultyList=this.universityList[index].faculties
  }

  changeDepartmentList(e)
  {
    this.departmentList=[]
    this.studentForm.patchValue({department1: null,department2: null});
    let id=e.target.value
    let index
    for(let i=0;i<this.facultyList.length;i++)
    {if(this.facultyList[i].id==id)
        {index=i;
          break;
        }
    }
    this.departmentList=this.facultyList[index].departments
  }

  addDepartment1(e)
  {
    this.departments[0]=e.target.value
  }
  addDepartment2(e)
  {
    this.departments[1]=e.target.value
  }

  addStudent() {
    this.studentForm.patchValue({departments: this.departments});
    this.studentForm.patchValue({type: 0});

    let user = this.studentForm.value;
    this.errorList=[]
    
    this.authService.register(user).subscribe(
      res=>{
            this.registerService.changeToken(res.data.token.access_token)
            this.router.navigate(['/email/verify']);
           },

      err=>{
              if(err.error&&err.error.errors)
              {
              window.scroll(0,0);
              err.error.errors.email?this.errorList.push(err.error.errors.email):null;
              err.error.errors.mobile?this.errorList.push(err.error.errors.mobile):null;
              this.errorList.push("make sure that Departments have different values");

              }  
              console.log(err) 
           }
    )
  }
}
