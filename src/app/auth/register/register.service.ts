import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class RegisterService {
  private userToken = new BehaviorSubject<any>(null);
  currentToken = this.userToken.asObservable();


  constructor() { }

  changeToken(token:any) {
    this.userToken.next(token)
  }

}
