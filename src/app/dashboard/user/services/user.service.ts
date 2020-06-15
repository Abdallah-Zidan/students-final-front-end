import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { User } from '../models/user.model';
import { StudentProfile } from '../models/student-profile.model';
import { TeachingStaffProfile } from '../models/teaching-staff-profile.model';
import { CompanyProfile } from '../models/company-profile.model';
import { ModeratorProfile } from '../models/moderator-profile.model';
import { University } from '../../university/models/university.model';
import { Faculty } from '../../faculty/models/faculty.model';
import { Department } from '../../department/models/department.model';
import { Course } from '../../course/models/course.model';

const endPoints = {
	users: 'http://localhost:8000/api/v1/dashboard/users'
};

@Injectable({
	providedIn: 'root'
})
export class UserService {
	constructor(private http: HttpClient) { }

	getUsers(items, page: number = 1): Observable<User[]> {
		let subject = new Subject<any>();
		let params = new HttpParams().append('items', items.toString()).append('page', page.toString());

		this.http.get(endPoints.users, {
			params: params
		}).subscribe((res: any) => {
			if (res) {
				console.log(res);
				let length = res.meta.total;
				let pageSize = res.meta.per_page;
				let users = new Array<User>();

				res.data.users.map(user => {
					let profile = null;

					if (user.type === 'Student')
						profile = new StudentProfile(user.profile.birthdate, user.profile.year);
					else if (user.type === 'TeachingStaff')
						profile = new TeachingStaffProfile(user.profile.birthdate, user.profile.scientific_certificates);
					else if (user.type === 'Company')
						profile = new CompanyProfile(user.profile.fax, user.profile.description, user.profile.website);
					else if (user.type === 'Moderator') {
						let university = new University(user.profile.faculty.university.id, user.profile.faculty.university.name);
						let faculty = new Faculty(user.profile.faculty.id, user.profile.faculty.name, university);
						profile = new ModeratorProfile(faculty);
					}

					users.push(new User(user.id, user.name, user.email, '', user.verified, user.gender, user.blocked, user.address, user.mobile, user.avatar, user.type, profile));
				});

				subject.next({
					length: length,
					pageSize: pageSize,
					users: users
				});
			}
		}, (error) => {
			console.log(error);
		});

		return subject.asObservable();
	}

	getUser(id: number): Observable<User> {
		let subject = new Subject<any>();

		this.http.get(`${endPoints.users}/${id}`).subscribe((res: any) => {
			if (res) {
				console.log(res);
				let profile = null;
				let faculties = null;
				let courses = null;

				if (res.data.user.type === 'Student')
					profile = new StudentProfile(res.data.user.profile.birthdate, res.data.user.profile.year);
				else if (res.data.user.type === 'TeachingStaff')
					profile = new TeachingStaffProfile(res.data.user.profile.birthdate, res.data.user.profile.scientific_certificates);
				else if (res.data.user.type === 'Company')
					profile = new CompanyProfile(res.data.user.profile.fax, res.data.user.profile.description, res.data.user.profile.website);
				else if (res.data.user.type === 'Moderator') {
					let university = new University(res.data.user.profile.faculty.university.id, res.data.user.profile.faculty.university.name);
					let faculty = new Faculty(res.data.user.profile.faculty.id, res.data.user.profile.faculty.name, university);
					profile = new ModeratorProfile(faculty);
				}

				if (res.data.user.type === 'Student' ||
					res.data.user.type === 'TeachingStaff') {
					faculties = new Array<Faculty>();
					courses = new Array<Course>();

					res.data.user.department_faculties.map(departmentFaculty => {
						let faculty_index = faculties.findIndex(faculty => faculty.id === departmentFaculty.faculty.id);

						if (faculty_index !== -1) {
							if (!faculties[faculty_index].departments)
								faculties[faculty_index].departments = new Array<Department>();

							let department = new Department(departmentFaculty.department.id, departmentFaculty.department.name);
							faculties[faculty_index].departments.push(department);
						}
						else {
							let department = new Department(departmentFaculty.department.id, departmentFaculty.department.name);
							let university = new University(departmentFaculty.faculty.university.id, departmentFaculty.faculty.university.name);
							let faculty = new Faculty(departmentFaculty.faculty.id, departmentFaculty.faculty.name, university, [department]);
							faculties.push(faculty);
						}
					});

					res.data.user.course_department_faculties.map(courseDepartmentFaculty => {
						if (!courses.find(course => course.id === courseDepartmentFaculty.course.id))
							courses.push(new Course(courseDepartmentFaculty.course.id, courseDepartmentFaculty.course.name, courseDepartmentFaculty.course.description));
					});
				}

				let user = new User(res.data.user.id, res.data.user.name, res.data.user.email, '', res.data.user.verified, res.data.user.gender, res.data.user.blocked, res.data.user.address, res.data.user.mobile, res.data.user.avatar, res.data.user.type, profile, faculties, courses);

				subject.next({
					user: user
				});
			}
		}, (error) => {
			console.log(error);
		});

		return subject.asObservable();
	}

	addUser(user: User, department: Department = null): Observable<User> {
		let subject = new Subject<any>();
		let data = user.toJson();

		if (department) data.append('department_id', department.id.toString());

		this.http.post(endPoints.users, data).subscribe((res: any) => {
			if (res) {
				console.log(res);
				user.id = res.data.user.id;

				subject.next({
					user: user
				});
			}
		}, (error) => {
			console.log(error);
		});

		return subject.asObservable();
	}

	editUser(user: User) {
		let subject = new Subject();

		this.http.post(`${endPoints.users}/${user.id}`, user.toJson('PUT')).subscribe((res: any) => {
			subject.next();
		}, (error) => {
			console.log(error);
		});

		return subject.asObservable();
	}

	deleteUser(id: number) {
		let subject = new Subject();

		this.http.delete(`${endPoints.users}/${id}`).subscribe((res: any) => {
			subject.next();
		}, (error) => {
			console.log(error);
		});

		return subject.asObservable();
	}

	attachDepartment(user_id: number, department_id: number, faculty_id: number = null) {
		let subject = new Subject();
		let data = {
			'user_id': user_id,
			'department_id': department_id,
			'faculty_id': faculty_id ? faculty_id : undefined
		}

		this.http.post(`${endPoints.users}/departments/attach`, data).subscribe((res: any) => {
			subject.next();
		}, (error) => {
			console.log(error);
		});

		return subject.asObservable();
	}

	detachDepartment(user_id: number, department_id: number, faculty_id: number = null) {
		let subject = new Subject();
		let data = {
			'user_id': user_id,
			'department_id': department_id,
			'faculty_id': faculty_id ? faculty_id : undefined
		}

		this.http.post(`${endPoints.users}/departments/detach`, data).subscribe((res: any) => {
			subject.next();
		}, (error) => {
			console.log(error);
		});

		return subject.asObservable();
	}

	attachCourse(user_id: number, course_id: number, department_id: number, faculty_id: number = null) {
		let subject = new Subject();
		let data = {
			'user_id': user_id,
			'course_id': course_id,
			'department_id': department_id,
			'faculty_id': faculty_id ? faculty_id : undefined
		}

		this.http.post(`${endPoints.users}/courses/attach`, data).subscribe((res: any) => {
			subject.next();
		}, (error) => {
			console.log(error);
		});

		return subject.asObservable();
	}

	detachCourse(user_id: number, course_id: number, department_id: number, faculty_id: number = null) {
		let subject = new Subject();
		let data = {
			'user_id': user_id,
			'course_id': course_id,
			'department_id': department_id,
			'faculty_id': faculty_id ? faculty_id : undefined
		}

		this.http.post(`${endPoints.users}/courses/detach`, data).subscribe((res: any) => {
			subject.next();
		}, (error) => {
			console.log(error);
		});

		return subject.asObservable();
	}
}