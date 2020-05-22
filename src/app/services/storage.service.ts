import { Injectable } from '@angular/core';

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
}
