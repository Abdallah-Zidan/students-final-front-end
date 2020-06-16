import { Component, OnInit, EventEmitter, Inject } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AuthService } from '../../../../auth/services/auth.service';
import { User as AuthUser } from '../../../../auth/user.model';
import { Course } from '../../models/course.model';
import { Faculty } from '../../../faculty/models/faculty.model';
import { Department } from '../../../department/models/department.model';

@Component({
	selector: 'app-attach-dialog',
	templateUrl: './attach-dialog.component.html',
	styleUrls: ['./attach-dialog.component.scss']
})
export class AttachDialogComponent implements OnInit {
	user: AuthUser;
	form: FormGroup;
	course: Course;
	faculties: Array<Faculty>
	departments: Array<Department>
	onSubmitd = new EventEmitter<{ course: Course, department: Department, faculty: Faculty }>();
	isBusy: boolean = false;

	constructor(@Inject(MAT_DIALOG_DATA) public data: any, private authService: AuthService, private http: HttpClient) {
		this.course = data.course
	}

	ngOnInit(): void {
		this.authService.user.subscribe((user: AuthUser) => this.user = user);

		if (this.user.personalData.type === 'Admin') {
			if (this.data.formName === 'Attach')
				this.getDepartments();
			else
				this.getCourse();
		}
		else
			this.getModeratorDepartments();

		this.form = new FormGroup({
			name: new FormControl(this.course.name, [
				Validators.required
			]),
			faculty: new FormControl(null, this.user.personalData.type === 'Admin' ? [
				Validators.required
			] : []),
			department: new FormControl(null, [
				Validators.required
			])
		});
	}

	getDepartments() {
		this.http.get('http://localhost:8000/api/v1/universities').subscribe((res: any) => {
			if (res) {
				console.log(res);
				this.faculties = new Array<Faculty>();

				res.data.universities.map(university => {
					university.faculties.map(faculty => {
						let departments = new Array<Department>();

						faculty.departments.map(department => {
							departments.push(new Department(department.id, department.name));
						});

						this.faculties.push(new Faculty(faculty.id, faculty.name, null, departments));
					});
				});
			}
		}, (error) => {
			console.log(error);
		});
	}

	getModeratorDepartments() {
		this.http.get('http://localhost:8000/api/v1/universities').subscribe((res: any) => {
			if (res) {
				console.log(res);
				this.departments = new Array<Department>();

				res.data.universities.map(university => {
					university.faculties.map(faculty => {
						if (faculty.id === this.user.faculty.id) {
							faculty.departments.map(department => {
								if (!this.departments.find(item => { item.id === department.id }))
									this.departments.push(new Department(department.id, department.name));
							});
						}
					});
				});
			}
		}, (error) => {
			console.log(error);
		});
	}

	getCourse() {
		this.http.get(`http://localhost:8000/api/v1/dashboard/courses/${this.course.id}`).subscribe((res: any) => {
			if (res) {
				console.log(res);
				this.faculties = new Array<Faculty>();

				res.data.course.department_faculties.map(departmentFaculty => {
					let faculty_index = this.faculties.findIndex(faculty => faculty.id === departmentFaculty.faculty.id);

					if (faculty_index !== -1) {
						if (!this.faculties[faculty_index].departments)
							this.faculties[faculty_index].departments = new Array<Department>();

						let department = new Department(departmentFaculty.department.id, departmentFaculty.department.name);
						this.faculties[faculty_index].departments.push(department);
					}
					else {
						let department = new Department(departmentFaculty.department.id, departmentFaculty.department.name);
						let faculty = new Faculty(departmentFaculty.faculty.id, departmentFaculty.faculty.name, null, [department]);
						this.faculties.push(faculty);
					}
				});
			}
		}, (error) => {
			console.log(error);
		});
	}

	onFacultyChange(event) {
		let faculty = this.faculties.find((faculty) => faculty.id === event.value);
		this.departments = faculty.departments;
		this.form.setValue({
			name: this.form.get('name').value,
			faculty: this.form.get('faculty').value,
			department: null
		})
	}

	onSubmit(event) {
		this.isBusy = true;
		let faculty;
		let course = new Course(this.course.id, this.form.get('name').value);
		let department = this.departments.find((department) => department.id === this.form.get('department').value);

		if (this.user.personalData.type === 'Admin')
			faculty = this.faculties.find((faculty) => faculty.id === this.form.get('faculty').value);
		else
			faculty = null;

		this.onSubmitd.emit({ course, department, faculty });
	}
}