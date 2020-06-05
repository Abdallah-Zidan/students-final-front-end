import { Injectable } from '@angular/core';
import { HttpService } from 'src/app/services/http.service';
import { StorageService } from 'src/app/services/storage.service';
import { Group } from '../shared/models/group.model';
import {
  getDepartmentGroups,
  getFacultyGroups,
  getUniversityGroups,
} from '../shared/helpers/shared-helper';

@Injectable({
  providedIn: 'root',
})
export class GroupsService {
  departmentGroups: Group[] = [];
  facultyGroups: Group[] = [];
  universityGroups: Group[] = [];

  constructor(
    private httpService: HttpService,
    private storageService: StorageService
  ) {}

  /**
   * get the groups where user can access
   * first it checks if groups are saved in local storage or not
   * if they exist just reads them .. if not .. sends a request to the server
   * then save them in localstorage
   */
  getGroups() {
    if (this.storageService.getDepartmentGroups('groups').length > 0) {
      this.departmentGroups = this.storageService.getDepartmentGroups('groups');
      this.facultyGroups = this.storageService.getFacultyGroups('groups');
      this.universityGroups = this.storageService.getUniversityGroups('groups');
    } else {
      this.httpService.requestGroups().subscribe((res: any) => {
        console.log(res);

        const groups = res.data && res.data.department_faculties;
        if (groups) {
          this.universityGroups = getUniversityGroups(groups);
          this.facultyGroups = getFacultyGroups(groups);
          this.departmentGroups = getDepartmentGroups(groups);
          this.storageService.saveItem(
            'groups',
            new Array(
              this.departmentGroups,
              this.facultyGroups,
              this.universityGroups
            )
          );
        }
      });
    }
  }
  getGroup(id: string, scope) {
    let group: Group = null;
    const groups: Group[][] = this.storageService.getItem('groups');
    if (groups && groups[+scope]) {
      groups[+scope].forEach((element) => {
        if (element.id == id) {
          group = element;
        }
      });
    }
    return group;
  }
}
