import { Injectable } from '@angular/core';
import { User } from '../auth/user.model';
import { HttpClient } from '@angular/common/http';
import { Group } from '../shared/models/group.model';

@Injectable({
  providedIn: 'root',
})
export class StorageService {
  constructor(public http: HttpClient) {}

  saveItem(key: string, item: any) {
    localStorage.setItem(key, JSON.stringify(item));
  }

  getItem(key: string) {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : null;
  }

  removeItem(key: string) {
    localStorage.removeItem(key);
  }

  //#region get authenticated user from local storage
  getUser(key: string) {
    const user = this.getItem(key);
    if (user) {
      return new User(
        user.id,
        user.name,
        user.email,
        user.type,
        user.address,
        user.mobile,
        user.avatar,
        user.verified,
        user._token
      );
    } else {
      return null;
    }
  }
  //#endregion

  //#region getting groups from local storage
  getGroups(key: string, index: number) {
    const groupsArray: Group[] = [];
    const groups = this.getItem(key);
    if (groups && groups[index]) {
      groups[index].forEach((group) => {
        groupsArray.push(new Group(group.id, group.name, group.scope));
      });
    }
    return groupsArray;
  }
  getDepartmentGroups(key: string) {
    return this.getGroups(key, 0);
  }

  getFacultyGroups(key: string) {
    return this.getGroups(key, 1);
  }
  getUniversityGroups(key: string) {
    return this.getGroups(key, 2);
  }
  //#endregion
}
