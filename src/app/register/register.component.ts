import { Component, OnInit } from '@angular/core';
import { faUserFriends,faMoneyBill,faHouseUser,faExchangeAlt,faChalkboardTeacher} from '@fortawesome/free-solid-svg-icons';
import { StorageService } from '../services/storage.service';
import { Router } from '@angular/router';

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
  public finish = false;
  
  constructor(private storageService:StorageService,private router:Router) {}

  ngOnInit(): void {
    const user = this.storageService.getUser('user');
    if (user) {
      if (user.token) {
      this.router.navigate(['']);
    } 
  }}

  showStudentForm()
  {
    this.Student=true
  }
  showCompanyForm()
  {
    this.Student=false
  }

}
