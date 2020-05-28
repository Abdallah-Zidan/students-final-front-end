import { Component, OnInit } from '@angular/core';
import { faUserFriends,faMoneyBill,faHouseUser,faExchangeAlt,faChalkboardTeacher} from '@fortawesome/free-solid-svg-icons';


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
