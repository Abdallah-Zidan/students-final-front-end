import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { University } from '../models/university.model';
import { Faculty } from '../../faculty/models/faculty.model';

const endPoints = {
	universities: 'http://localhost:8000/api/v1/dashboard/universities'
};

@Injectable({
	providedIn: 'root'
})
export class UniversityService {
	constructor(private http: HttpClient) { }

	getUniversities(items, page: number = 1): Observable<University[]> {
		let subject = new Subject<any>();
		let params = new HttpParams().append('items', items.toString()).append('page', page.toString());

		this.http.get(endPoints.universities, {
			params: params
		}).subscribe((res: any) => {
			if (res) {
				console.log(res);
				let length = res.meta.total;
				let pageSize = res.meta.per_page;
				let universities = new Array<University>();

				res.data.universities.map(university => {
					universities.push(new University(university.id, university.name));
				});

				subject.next({
					length: length,
					pageSize: pageSize,
					universities: universities
				});
			}
		}, (error) => {
			console.log(error);
		});

		return subject.asObservable();
	}

	getUniversity(id: number): Observable<University> {
		let subject = new Subject<any>();

		this.http.get(`${endPoints.universities}/${id}`).subscribe((res: any) => {
			if (res) {
				console.log(res);
				let faculties = Array<Faculty>();

				res.data.university.faculties.map(faculty => {
					faculties.push(new Faculty(faculty.id, faculty.name));
				});

				let university = new University(res.data.university.id, res.data.university.name, faculties);

				subject.next({
					university: university
				});
			}
		}, (error) => {
			console.log(error);
		});

		return subject.asObservable();
	}

	addUniversity(university: University): Observable<University> {
		let subject = new Subject<any>();

		this.http.post(endPoints.universities, university.toJson()).subscribe((res: any) => {
			if (res) {
				console.log(res);
				university.id = res.data.university.id;

				subject.next({
					university: university
				});
			}
		}, (error) => {
			console.log(error);
		});

		return subject.asObservable();
	}

	editUniversity(university: University) {
		let subject = new Subject();

		this.http.put(`${endPoints.universities}/${university.id}`, university.toJson()).subscribe((res: any) => {
			subject.next();
		}, (error) => {
			console.log(error);
		});

		return subject.asObservable();
	}

	deleteUniversity(id: number) {
		let subject = new Subject();

		this.http.delete(`${endPoints.universities}/${id}`).subscribe((res: any) => {
			subject.next();
		}, (error) => {
			console.log(error);
		});

		return subject.asObservable();
	}
}