import { Component, OnInit } from '@angular/core';
import { faUserFriends,faMoneyBill,faHouseUser,faExchangeAlt,faChalkboardTeacher} from '@fortawesome/free-solid-svg-icons';
import { StorageService } from '../services/storage.service';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { invalid } from '@angular/compiler/src/render3/view/util';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  faUserFriends = faUserFriends;
  faMoneyBill = faMoneyBill;
  faHouseUser = faHouseUser;
  faExchangeAlt = faExchangeAlt;
  faChalkboardTeacher = faChalkboardTeacher;
  universityList = [];
  imageValidation;
  bodValidation;
  flag;
  studentForm: FormGroup
  companyForm: FormGroup
  constructor(private storageService:StorageService,private fb: FormBuilder) {
    let studentformControls = {
      name : new FormControl('',[
        Validators.required,
        Validators.pattern("[a-z .'-]+"),
        Validators.minLength(6)
      ]),

      university : new FormControl('',[
        Validators.required,
      ]),

      faculty : new FormControl('',[
        Validators.required,
      ]),

      department : new FormControl('',[
        Validators.required,
      ]),

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
        Validators.pattern("[0-9]+"),
        Validators.minLength(11),
        Validators.maxLength(11)
      ]),
      email: new FormControl('',[
        Validators.required,
        Validators.pattern("[A-Za-z0-9._%-]+@[A-Za-z0-9._%-]+\\.edu.eg")
      ]),
      password: new FormControl('',[
        Validators.required,
        Validators.minLength(6)
      ]),
      repassword: new FormControl('',[
        Validators.required,
      ]),
      avatar: new FormControl(''),
    }


   
    this.studentForm = this.fb.group(studentformControls);
   }

  ngOnInit(): void {
    this.storageService.getAllUniversites().subscribe(
      result =>{
        this.universityList = result;
      },
      error =>{
        console.log(error);
      }

    )
  }
  showStudentForm(event)
  {
  }
  showCompanyForm(event)
  {
  }

  get name() { return this.studentForm.get('name') }
  get phone() { return this.studentForm.get('phone') }
  get email() { return this.studentForm.get('email') }
  get password() { return this.studentForm.get('password') }
  get repassword() { return this.studentForm.get('repassword') }
  get birthdate() { return this.studentForm.get('birthdate') }
  get university() { return this.studentForm.get('university') }
  get faculty() { return this.studentForm.get('faculty') }
  get department() { return this.studentForm.get('department') }
  get level() { return this.studentForm.get('level') }
  get address() { return this.studentForm.get('address') }
  get avatar() { return this.studentForm.get('avatar') }

  onFileChange(event) {
    if (event.target.files.length > 0 )
    {
      const file = event.target.files[0];
      if(file.type.match(/image\/*/) != null)
      {
       this.imageValidation="";
       this.flag=1;
       this.studentForm.patchValue({avatar: file});
       return true
      }
        this.flag=0;
        this.imageValidation="invalid file , please select Image"
        return false;
    }
    else{
      this.flag=1;
      this.imageValidation="";}
  }

  date(e) {
    let birthDate = new Date(e.target.value).getFullYear()
    let today = new Date().getFullYear()
    if((today - birthDate) >18 && (today - birthDate) < 40)
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

  addStudent(){
    console.log(this.studentForm.value);
  }
}
