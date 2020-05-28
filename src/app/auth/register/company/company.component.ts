import { Component, OnInit } from '@angular/core';
import { StorageService } from '../../../services/storage.service';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { RegisterComponent } from '../register.component';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';



@Component({
  selector: 'app-company',
  templateUrl: './company.component.html',
  styleUrls: ['./company.component.scss']
})
export class CompanyComponent implements OnInit {
  companyForm: FormGroup
  imageValidation;
  flag;
  errorList=[];

  constructor(
    private authService: AuthService,
    private storageService:StorageService,
    private fb: FormBuilder,
    private register:RegisterComponent,
    private router:Router,
    )
  { 
    let companyformControls = {
      name : new FormControl('',[
        Validators.required,
        Validators.pattern("[a-z .'-]+"),
        Validators.minLength(6)
      ]),

      phone: new FormControl('',[
        Validators.required,
        Validators.pattern("[0-9]+"),
        Validators.minLength(11),
        Validators.maxLength(15)
      ]),
      email: new FormControl('',[
        Validators.required,
        Validators.pattern("[A-Za-z0-9._%-]+@[A-Za-z0-9._%-]+\\.[a-z]{2,3}")
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
      website: new FormControl('',[
        Validators.required,
        Validators.pattern("(https+://)+([\\da-z.-]+)\\.([a-z.]{2,6})[/\\w .-]*/?\\.([a-z.]{2,6})[/\\w .-]*/?")
      ]),
      fax: new FormControl('',[
        Validators.required,
        Validators.pattern("[+]{1}20[0-9]{8,11}"),
        Validators.maxLength(15),

      ]),
      address : new FormControl('',[
        Validators.required,
      ]),
      description: new FormControl('',[
        Validators.required,
        Validators.maxLength(250),

      ]),
      gender : new FormControl('',[
        Validators.required
      ]),
      type : new FormControl(''),
      blocked : new FormControl('')
    }
    this.companyForm = this.fb.group(companyformControls);
  }

  ngOnInit(): void {
  }

  get name() { return this.companyForm.get('name') }
  get phone() { return this.companyForm.get('phone') }
  get email() { return this.companyForm.get('email') }
  get password() { return this.companyForm.get('password') }
  get repassword() { return this.companyForm.get('repassword') }
  get address() { return this.companyForm.get('address') }
  get fax() { return this.companyForm.get('fax') }
  get website() { return this.companyForm.get('website') }
  get gender() { return this.companyForm.get('gender') }
  get description() { return this.companyForm.get('description') }



  
  addCompany(){
    this.companyForm.patchValue({type: '1',blocked:'0'});
    let user = this.companyForm.value;
    this.errorList=[]
    
    this.authService.register(user).subscribe(
      res=>{
        this.router.navigate(['/email/verify']);
      },
        err=>{
          err.error.errors.email?this.errorList.push(err.error.errors.email):null
          err.error.errors.mobile?this.errorList.push(err.error.errors.mobile):null
          err.error.errors.fax?this.errorList.push(err.error.errors.fax):null
          err.error.errors.website?this.errorList.push(err.error.errors.website):null
        }
    )
    }
}
