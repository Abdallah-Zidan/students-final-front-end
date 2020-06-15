import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { Course } from '../models/course.model';
import { Department } from '../../department/models/department.model';

const endPoints = {
	courses: 'http://localhost:8000/api/v1/dashboard/courses'
};

@Injectable({
	providedIn: 'root'
})
export class CourseService {
	constructor(private http: HttpClient) { }

	getCourses(items, page: number = 1): Observable<Course[]> {
		let subject = new Subject<any>();
		let params = new HttpParams().append('items', items.toString()).append('page', page.toString());

		this.http.get(endPoints.courses, {
			params: params
		}).subscribe((res: any) => {
			if (res) {
				console.log(res);
				let length = res.meta.total;
				let pageSize = res.meta.per_page;
				let courses = new Array<Course>();

				res.data.courses.map(course => {
					courses.push(new Course(course.id, course.name, course.description));
				});

				subject.next({
					length: length,
					pageSize: pageSize,
					courses: courses
				});
			}
		}, (error) => {
			console.log(error);
		});

		return subject.asObservable();
	}

	getCourse(id: number): Observable<Course> {
		let subject = new Subject<any>();

		this.http.get(`${endPoints.courses}/${id}`).subscribe((res: any) => {
			if (res) {
				console.log(res);
				let departments = Array<Department>();

				res.data.course.department_faculties.map(department_faculty => {
					if (!departments.find((department) => department.id === department_faculty.department.id))
						departments.push(new Department(department_faculty.department.id, department_faculty.department.name));
				});

				let course = new Course(res.data.course.id, res.data.course.name, res.data.course.description, departments);

				subject.next({
					course: course
				});
			}
		}, (error) => {
			console.log(error);
		});

		return subject.asObservable();
	}

	addCourse(course: Course): Observable<Course> {
		let subject = new Subject<any>();

		this.http.post(endPoints.courses, course.toJson()).subscribe((res: any) => {
			if (res) {
				console.log(res);
				course.id = res.data.course.id;

				subject.next({
					course: course
				});
			}
		}, (error) => {
			console.log(error);
		});

		return subject.asObservable();
	}

	editCourse(course: Course) {
		let subject = new Subject();

		this.http.put(`${endPoints.courses}/${course.id}`, course.toJson()).subscribe((res: any) => {
			subject.next();
		}, (error) => {
			console.log(error);
		});

		return subject.asObservable();
	}

	deleteCourse(id: number) {
		let subject = new Subject();

		this.http.delete(`${endPoints.courses}/${id}`).subscribe((res: any) => {
			subject.next();
		}, (error) => {
			console.log(error);
		});

		return subject.asObservable();
	}

	attachCourse(course_id: number, department_id: number, faculty_id: number = null) {
		let subject = new Subject();
		let data = {
			'course_id': course_id,
			'department_id': department_id,
			'faculty_id': faculty_id ? faculty_id : undefined
		}

		this.http.post(`${endPoints.courses}/attach`, data).subscribe((res: any) => {
			subject.next();
		}, (error) => {
			console.log(error);
		});

		return subject.asObservable();
	}

	detachCourse(course_id: number, department_id: number, faculty_id: number = null) {
		let subject = new Subject();
		let data = {
			'course_id': course_id,
			'department_id': department_id,
			'faculty_id': faculty_id ? faculty_id : undefined
		}

		this.http.post(`${endPoints.courses}/detach`, data).subscribe((res: any) => {
			subject.next();
		}, (error) => {
			console.log(error);
		});

		return subject.asObservable();
	}
}