import { Injectable } from '@angular/core';
import { User } from '../auth/user.model';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root',
})
export class StorageService {
  saveItem(key: string, item: any) {
    localStorage.setItem(key, JSON.stringify(item));
  }

  getItem(key: string) {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : false;
  }
  getUser(key: string) {
    const user = this.getItem(key);
    if (user) {
      return new User(user.email, user.id, user._token);
    } else {
      return null;
    }
  }
  removeItem(key: string) {
    localStorage.removeItem(key);
  }
  private AllUniversitesLink = "https://jsonplaceholder.typicode.com/users";
  constructor(public http: HttpClient) { }

  getAllUniversites() {
    return this.http.get<any>(this.AllUniversitesLink);
  }
}
