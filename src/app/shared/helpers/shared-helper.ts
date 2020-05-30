import { Group } from '../models/group.model';

const getFacultyGroups = (groups: any) => {
  const facIds = [];
  const groupsArr: Group[] = [];
  groups.map((group) => {
    if (!facIds.includes(group.faculty.id)) {
      const id = group.faculty.id;
      const name = group.faculty.name;
      const scope = '1';
      groupsArr.push(new Group(id, name, scope));
    }
  });
  return groupsArr;
};
const getDepartmentGroups = (groups: any) => {
  const groupArr: Group[] = [];
  groups.forEach((group) => {
    const id = group.id;
    const scope = '0';
    const name = group.department.name;
    groupArr.push(new Group(id, name, scope));
  });
  return groupArr;
};

export { getDepartmentGroups, getFacultyGroups };
