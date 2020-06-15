import { Component, OnInit, EventEmitter, Inject } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AuthService } from '../../../../auth/services/auth.service';
import { UserService } from '../../services/user.service';
import { CourseService } from '../../../course/services/course.service';
import { User as AuthUser } from '../../../../auth/user.model';
import { User } from '../../models/user.model';
import { Faculty } from '../../../faculty/models/faculty.model';
import { Department } from '../../../department/models/department.model';
import { Course } from 'src/app/dashboard/course/models/course.model';

@Component({
	selector: 'app-attach-dialog',
	templateUrl: './attach-dialog.component.html',
	styleUrls: ['./attach-dialog.component.scss']
})
export class AttachDialogComponent implements OnInit {
	form: FormGroup;
	form2: FormGroup;
	authUser: AuthUser;
	user: User;
	faculties: Array<Faculty>
	departments: Array<Department>
	courses: Array<Course>
	onDepartmentSubmitd = new EventEmitter<{ department: Department, faculty: Faculty }>();
	onCourseSubmitd = new EventEmitter < { course: Course, department: Department, faculty: Faculty }>();
	isBusy: boolean = false;

	constructor(@Inject(MAT_DIALOG_DATA) public data: any, private authService: AuthService, private http: HttpClient, private userService: UserService, private courseService: CourseService) {
		this.user = data.user
	}

	ngOnInit(): void {
		this.authService.user.subscribe((user: AuthUser) => this.authUser = user);

		this.getDepartments();

		this.form = new FormGroup({
			faculty: new FormControl(null, this.authUser.personalData.type === 'Admin' ? [
				Validators.required
			] : []),
			department: new FormControl(null, [
				Validators.required
			])
		});
		this.form2 = new FormGroup({
			course: new FormControl(null, [
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
						if (this.authUser.personalData.type === 'Admin' || (this.authUser.personalData.type === 'Moderator' && this.authUser.faculty.id === faculty.id)) {
							let departments = Array<Department>();

							faculty.departments.map(department => {
								departments.push(new Department(department.id, department.name));
							});

							this.faculties.push(new Faculty(faculty.id, faculty.name, null, departments));
						}
					});
				});

				this.getCourses();

				if (this.authUser.personalData.type === 'Moderator') this.departments = this.faculties[0].departments;
			}
		}, (error) => {
			console.log(error);
		});
	}

	getCourses() {
		this.http.get('http://localhost:8000/api/v1/dashboard/courses?items=*').subscribe((res: any) => {
			if (res) {
				console.log(res);

				res.data.courses.map(course => {
					course.department_faculties.map(departmentFaculty => {
						let faculty = this.faculties.find(faculty => faculty.id === departmentFaculty.faculty.id);

						if (faculty) {
							let department = faculty.departments.find(department => department.id === departmentFaculty.department.id);

							if (department) {
								if (!department.courses)
									department.courses = new Array<Course>();

								department.courses.push(new Course(course.id, course.name, course.description))
							}
						}
					});
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
			faculty: this.form.get('faculty').value,
			department: null
		});
	}

	onDepartmentChange(event) {
		let department = this.departments.find((department) => department.id === event.value);
		this.courses = department.courses;
		this.form2.setValue({
			course: null
		});
	}

	onDepartmentSubmit(event) {
		this.isBusy = true;
		let faculty;
		let department = this.departments.find((department) => department.id === this.form.get('department').value);

		if (this.authUser.personalData.type === 'Admin')
			faculty = this.faculties.find((faculty) => faculty.id === this.form.get('faculty').value);
		else
			faculty = null;

		this.onDepartmentSubmitd.emit({ department, faculty });
	}

	onCourseSubmit(event) {
		this.isBusy = true;
		let faculty;
		let department = this.departments.find((department) => department.id === this.form.get('department').value);
		let course = this.courses.find((course) => course.id === this.form2.get('course').value);

		if (this.authUser.personalData.type === 'Admin')
			faculty = this.faculties.find((faculty) => faculty.id === this.form.get('faculty').value);
		else
			faculty = null;

		this.onCourseSubmitd.emit({ course, department, faculty });
	}
}