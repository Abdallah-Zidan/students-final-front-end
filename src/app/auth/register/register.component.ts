import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  Student=true;
  stActive="active";
  comActive  
  constructor() {}

  ngOnInit(): void {}

  showStudentForm()
  { this.stActive="active"
    this.comActive=""
    this.Student=true
  }
  showCompanyForm()
  {
    this.stActive=""
    this.comActive="active"
    this.Student=false
  }

}
