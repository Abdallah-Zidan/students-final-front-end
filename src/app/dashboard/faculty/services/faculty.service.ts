import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { Faculty } from '../models/faculty.model';
import { University } from '../../university/models/university.model';
import { Department } from '../../department/models/department.model';

const endPoints = {
	faculties: 'http://localhost:8000/api/v1/dashboard/faculties'
};

@Injectable({
	providedIn: 'root'
})
export class FacultyService {
	constructor(private http: HttpClient) { }

	getFaculties(items, page: number = 1): Observable<Faculty[]> {
		let subject = new Subject<any>();
		let params = new HttpParams().append('items', items.toString()).append('page', page.toString());

		this.http.get(endPoints.faculties, {
			params: params
		}).subscribe((res: any) => {
			if (res) {
				console.log(res);
				let length = res.meta.total;
				let pageSize = res.meta.per_page;
				let faculties = new Array<Faculty>();

				res.data.faculties.map(faculty => {
					if (faculty.university)
						faculties.push(new Faculty(faculty.id, faculty.name, new University(faculty.university.id, faculty.university.name)));
					else
						faculties.push(new Faculty(faculty.id, faculty.name));
				});

				subject.next({
					length: length,
					pageSize: pageSize,
					faculties: faculties
				});
			}
		}, (error) => {
			console.log(error);
		});

		return subject.asObservable();
	}

	getFaculty(id: number): Observable<Faculty> {
		let subject = new Subject<any>();

		this.http.get(`${endPoints.faculties}/${id}`).subscribe((res: any) => {
			if (res) {
				console.log(res);
				let departments = Array<Department>();

				res.data.faculty.departments.map(department => {
					departments.push(new Department(department.id, department.name));
				});

				let faculty = new Faculty(res.data.faculty.id, res.data.faculty.name, new University(res.data.faculty.university.id, res.data.faculty.university.name), departments);

				subject.next({
					faculty: faculty
				});
			}
		}, (error) => {
			console.log(error);
		});

		return subject.asObservable();
	}

	addFaculty(faculty: Faculty): Observable<Faculty> {
		let subject = new Subject<any>();

		this.http.post(endPoints.faculties, faculty.toJson()).subscribe((res: any) => {
			if (res) {
				console.log(res);
				faculty.id = res.data.faculty.id;

				subject.next({
					faculty: faculty
				});
			}
		}, (error) => {
			console.log(error);
		});

		return subject.asObservable();
	}

	editFaculty(faculty: Faculty) {
		let subject = new Subject();

		this.http.put(`${endPoints.faculties}/${faculty.id}`, faculty.toJson()).subscribe((res: any) => {
			subject.next();
		}, (error) => {
			console.log(error);
		});

		return subject.asObservable();
	}

	deleteFaculty(id: number) {
		let subject = new Subject();

		this.http.delete(`${endPoints.faculties}/${id}`).subscribe((res: any) => {
			subject.next();
		}, (error) => {
			console.log(error);
		});

		return subject.asObservable();
	}
}