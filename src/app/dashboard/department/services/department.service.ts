import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { Department } from '../models/department.model';
import { Faculty } from '../../faculty/models/faculty.model';
import { Course } from '../../course/models/course.model';

const endPoints = {
	departments: 'http://localhost:8000/api/v1/dashboard/departments'
};

@Injectable({
	providedIn: 'root'
})
export class DepartmentService {
	constructor(private http: HttpClient) { }

	getDepartments(items, page: number = 1): Observable<Department[]> {
		let subject = new Subject<any>();
		let params = new HttpParams().append('items', items.toString()).append('page', page.toString());

		this.http.get(endPoints.departments, {
			params: params
		}).subscribe((res: any) => {
			if (res) {
				console.log(res);
				let length = res.meta.total;
				let pageSize = res.meta.per_page;
				let departments = new Array<Department>();

				res.data.departments.map(department => {
					departments.push(new Department(department.id, department.name));
				});

				subject.next({
					length: length,
					pageSize: pageSize,
					departments: departments
				});
			}
		}, (error) => {
			console.log(error);
		});

		return subject.asObservable();
	}

	getDepartment(id: number): Observable<Department> {
		let subject = new Subject<any>();

		this.http.get(`${endPoints.departments}/${id}`).subscribe((res: any) => {
			if (res) {
				console.log(res);
				let faculties = Array<Faculty>();
				let courses = Array<Course>();

				res.data.department.faculties.map(faculty => {
					faculties.push(new Faculty(faculty.id, faculty.name));
				});
				res.data.department.course_department_faculties.map(courseDepartmentFaculty => {
					courses.push(new Course(courseDepartmentFaculty.course.id, courseDepartmentFaculty.course.name));
				});

				let department = new Department(res.data.department.id, res.data.department.name, faculties, courses);

				subject.next({
					department: department
				});
			}
		}, (error) => {
			console.log(error);
		});

		return subject.asObservable();
	}

	addDepartment(department: Department): Observable<Department> {
		let subject = new Subject<any>();

		this.http.post(endPoints.departments, department.toJson()).subscribe((res: any) => {
			if (res) {
				console.log(res);
				department.id = res.data.department.id;

				subject.next({
					department: department
				});
			}
		}, (error) => {
			console.log(error);
		});

		return subject.asObservable();
	}

	editDepartment(department: Department) {
		let subject = new Subject();

		this.http.put(`${endPoints.departments}/${department.id}`, department.toJson()).subscribe((res: any) => {
			subject.next();
		}, (error) => {
			console.log(error);
		});

		return subject.asObservable();
	}

	deleteDepartment(id: number) {
		let subject = new Subject();

		this.http.delete(`${endPoints.departments}/${id}`).subscribe((res: any) => {
			subject.next();
		}, (error) => {
			console.log(error);
		});

		return subject.asObservable();
	}

	attachDepartment(department_id: number, faculty_id: number = null) {
		let subject = new Subject();
		let data = {
			'department_id': department_id,
			'faculty_id': faculty_id ? faculty_id : undefined
		}

		this.http.post(`${endPoints.departments}/attach`, data).subscribe((res: any) => {
			subject.next();
		}, (error) => {
			console.log(error);
		});

		return subject.asObservable();
	}

	detachDepartment(department_id: number, faculty_id: number = null) {
		let subject = new Subject();
		let data = {
			'department_id': department_id,
			'faculty_id': faculty_id ? faculty_id : undefined
		}

		this.http.post(`${endPoints.departments}/detach`, data).subscribe((res: any) => {
			subject.next();
		}, (error) => {
			console.log(error);
		});

		return subject.asObservable();
	}
}