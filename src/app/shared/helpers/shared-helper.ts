import { Group } from '../models/group.model';

const getFacultyGroups = (groups: any) => {
  const facIds = [];
  const groupsArr: Group[] = [];
  groups.forEach((group) => {
    if (group.faculty) {
      if (!facIds.includes(group.faculty.id)) {
        const id = group.faculty.id;
        facIds.push(id);
        const name = group.faculty.name;
        const scope = '1';
        groupsArr.push(new Group(id, name, scope));
      }
    }
  });
  return groupsArr.length > 0 ? groupsArr : null;
};
const getDepartmentGroups = (groups: any) => {
  const groupsArr: Group[] = [];

  groups.forEach((group) => {
    if (group.department) {
      const id = group.id;
      const scope = '0';
      const name = group.department.name;
      groupsArr.push(new Group(id, name, scope));
    }
  });
  return groupsArr.length > 0 ? groupsArr : null;
};
const getUniversityGroups = (groups: any) => {
  const uniIds = [];
  const groupsArr: Group[] = [];

  groups.forEach((group) => {
    if (group.faculty) {
      if (group.faculty.university) {
        if (!uniIds.includes(group.faculty.university.id)) {
          const id = group.faculty.university.id;
          uniIds.push(id);
          const name = group.faculty.university.name;
          const scope = '2';
          groupsArr.push(new Group(id, name, scope));
        }
      }
    }
  });

  return groupsArr.length > 0 ? groupsArr : null;
};

export { getDepartmentGroups, getFacultyGroups, getUniversityGroups };
