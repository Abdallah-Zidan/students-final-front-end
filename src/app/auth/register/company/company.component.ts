import { Component, OnInit } from '@angular/core';
import { StorageService } from '../../../services/storage.service';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { RegisterComponent } from '../register.component';


@Component({
  selector: 'app-company',
  templateUrl: './company.component.html',
  styleUrls: ['./company.component.scss']
})
export class CompanyComponent implements OnInit {
  companyForm: FormGroup
  imageValidation;
  flag;
  constructor(private storageService:StorageService,private fb: FormBuilder,private register:RegisterComponent) { 
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
        Validators.maxLength(11)
      ]),
      email: new FormControl('',[
        Validators.required,
        Validators.pattern("[A-Za-z0-9._%-]+@[A-Za-z0-9._%-]+\\.[a-z]{2,3}")
      ]),
      password: new FormControl('',[
        Validators.required,
        Validators.minLength(6)
      ]),
      repassword: new FormControl('',[
        Validators.required,
      ]),
      website: new FormControl('',[
        Validators.required,
        Validators.pattern("(https?://)?([\\da-z.-]+)\\.([a-z.]{2,6})[/\\w .-]*/?\\.([a-z.]{2,6})[/\\w .-]*/?")
      ]),
      fax: new FormControl('',[
        Validators.required,
        Validators.pattern("[+]{1}20[0-9]{8}")
      ]),
      avatar: new FormControl(''),
      address : new FormControl('',[
        Validators.required,
      ]),
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
  get avatar() { return this.companyForm.get('avatar') }
  get fax() { return this.companyForm.get('fax') }
  get website() { return this.companyForm.get('website') }

  onFileChange(event) {
    if (event.target.files.length > 0 )
    {
      const file = event.target.files[0];
      if(file.type.match(/image\/*/) != null)
      {
       this.imageValidation="";
       this.flag=1;
       this.companyForm.patchValue({avatar: file});
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

  addCompany(){
      let user = this.companyForm.value;
      console.log(user)
      this.register.finish=true;

      
      // this.storageService.addUser(user).subscribe(
      //   res=>{
      //         
      //        },
      //   err=>{
      //     console.log(err);
      //   }
      // )
    }
}
