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

  constructor() { }

  ngOnInit(): void {
  }
  showStudentForm(event)
  {
  }
  showCompanyForm(event)
  {
  }
}
