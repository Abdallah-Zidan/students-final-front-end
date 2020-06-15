import { Component, OnInit, EventEmitter, Inject } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AuthService } from '../../../../auth/services/auth.service';
import { FacultyService } from '../../../faculty/services/faculty.service';
import { HttpClient } from '@angular/common/http';
import { User as AuthUser } from '../../../../auth/user.model';
import { Faculty } from '../../../faculty/models/faculty.model';
import { Department } from 'src/app/dashboard/department/models/department.model';
import { User } from '../../models/user.model';
import { StudentProfile } from '../../models/student-profile.model';
import { TeachingStaffProfile } from '../../models/teaching-staff-profile.model';
import { CompanyProfile } from '../../models/company-profile.model';
import { ModeratorProfile } from '../../models/moderator-profile.model';

@Component({
	selector: 'app-create-dialog',
	templateUrl: './create-dialog.component.html',
	styleUrls: ['./create-dialog.component.scss']
})
export class CreateDialogComponent implements OnInit {
	form: FormGroup;
	authUser: AuthUser;
	faculties: Array<Faculty>;
	departments: Array<Department>;
	user: User;
	onSubmitd = new EventEmitter<{ user: User, department: Department }>();
	isBusy: boolean = false;

	constructor(@Inject(MAT_DIALOG_DATA) public data: any, private authService: AuthService, private facultyService: FacultyService, private http: HttpClient) {
		this.user = data.user
	}

	ngOnInit(): void {
		this.authService.user.subscribe((user: AuthUser) => this.authUser = user);

		if (this.data.formName === 'Edit' && this.authUser.personalData.type === 'Admin' && this.user.type === 'Moderator') this.getFaculties();

		this.form = new FormGroup({
			type: new FormControl(this.user.type, this.data.formName === 'Add' ? [
				Validators.required
			] : []),
			name: new FormControl(this.user.name, [
				Validators.required
			]),
			email: new FormControl(this.user.email, [
				Validators.required,
				Validators.email
			]),
			password: new FormControl(this.user.password, this.data.formName === 'Add' ? [
				Validators.required
			] : []),
			gender: new FormControl(this.user.gender, [
				Validators.required
			]),
			blocked: new FormControl(this.user.blocked, this.data.formName === 'Edit' ? [
				Validators.required
			] : []),
			address: new FormControl(this.user.address, [
				Validators.required
			]),
			mobile: new FormControl(this.user.mobile, [
				Validators.required
			]),
			birthdate: new FormControl(this.user.type === 'Student' || this.user.type === 'TeachingStaff' ? this.user.profile.birthdate : null),
			year: new FormControl(this.user.type === 'Student' ? this.user.profile.year : null),
			certificates: new FormControl(this.user.type === 'TeachingStaff' ? this.user.profile.certificates : null),
			fax: new FormControl(this.user.type === 'Company' ? this.user.profile.fax : null),
			description: new FormControl(this.user.type === 'Company' ? this.user.profile.description : null),
			website: new FormControl(this.user.type === 'Company' ? this.user.profile.website : null),
			faculty: new FormControl(this.user.type === 'Moderator' ? this.user.profile.faculty.id : null),
			department: new FormControl(null),
			avatar: new FormControl(null)
		});
		this.form.get('type').valueChanges.subscribe(type => {
			if (type === 'Student') {
				let item = this.form.get('birthdate');
				item.setValidators([Validators.required]);
				item.updateValueAndValidity();

				item = this.form.get('year');
				item.setValidators([
					Validators.required,
					Validators.min(1),
					Validators.max(7)
				]);
				item.updateValueAndValidity();

				item = this.form.get('certificates');
				item.clearValidators();
				item.updateValueAndValidity();

				item = this.form.get('fax');
				item.clearValidators();
				item.updateValueAndValidity();

				item = this.form.get('description');
				item.clearValidators();
				item.updateValueAndValidity();

				item = this.form.get('website');
				item.clearValidators();
				item.updateValueAndValidity();

				item = this.form.get('faculty');
				item.clearValidators();
				item.updateValueAndValidity();

				item = this.form.get('department');
				item.clearValidators();
				item.updateValueAndValidity();
			}
			else if (type === 'TeachingStaff') {
				let item = this.form.get('birthdate');
				item.setValidators([Validators.required]);
				item.updateValueAndValidity();

				item = this.form.get('certificates');
				item.setValidators([Validators.required]);
				item.updateValueAndValidity();

				item = this.form.get('year');
				item.clearValidators();
				item.updateValueAndValidity();

				item = this.form.get('fax');
				item.clearValidators();
				item.updateValueAndValidity();

				item = this.form.get('description');
				item.clearValidators();
				item.updateValueAndValidity();

				item = this.form.get('website');
				item.clearValidators();
				item.updateValueAndValidity();

				item = this.form.get('faculty');
				item.clearValidators();
				item.updateValueAndValidity();

				if (this.data.formName === 'Add' && this.authUser.personalData.type === 'Moderator') {
					if (!this.departments) this.getModeratorDepartments();

					item = this.form.get('department');
					item.setValidators([Validators.required]);
					item.updateValueAndValidity();
				}
			}
			else if (type === 'Company') {
				let item = this.form.get('fax');
				item.setValidators([Validators.required]);
				item.updateValueAndValidity();

				item = this.form.get('description');
				item.setValidators([Validators.required]);
				item.updateValueAndValidity();

				item = this.form.get('website');
				item.setValidators([Validators.required]);
				item.updateValueAndValidity();

				item = this.form.get('birthdate');
				item.clearValidators();
				item.updateValueAndValidity();

				item = this.form.get('year');
				item.clearValidators();
				item.updateValueAndValidity();

				item = this.form.get('certificates');
				item.clearValidators();
				item.updateValueAndValidity();

				item = this.form.get('faculty');
				item.clearValidators();
				item.updateValueAndValidity();

				item = this.form.get('department');
				item.clearValidators();
				item.updateValueAndValidity();
			}
			else if (type === 'Moderator') {
				let item;

				if (this.authUser.personalData.type === 'Admin') {
					if (!this.faculties) this.getFaculties();

					item = this.form.get('faculty');
					item.setValidators([Validators.required]);
					item.updateValueAndValidity();
				}

				item = this.form.get('birthdate');
				item.clearValidators();
				item.updateValueAndValidity();

				item = this.form.get('year');
				item.clearValidators();
				item.updateValueAndValidity();

				item = this.form.get('certificates');
				item.clearValidators();
				item.updateValueAndValidity();

				item = this.form.get('fax');
				item.clearValidators();
				item.updateValueAndValidity();

				item = this.form.get('description');
				item.clearValidators();
				item.updateValueAndValidity();

				item = this.form.get('website');
				item.clearValidators();
				item.updateValueAndValidity();

				item = this.form.get('department');
				item.clearValidators();
				item.updateValueAndValidity();
			}
			else if (type === 'Admin') {
				let item = this.form.get('birthdate');
				item.clearValidators();
				item.updateValueAndValidity();

				item = this.form.get('year');
				item.clearValidators();
				item.updateValueAndValidity();

				item = this.form.get('certificates');
				item.clearValidators();
				item.updateValueAndValidity();

				item = this.form.get('fax');
				item.clearValidators();
				item.updateValueAndValidity();

				item = this.form.get('description');
				item.clearValidators();
				item.updateValueAndValidity();

				item = this.form.get('website');
				item.clearValidators();
				item.updateValueAndValidity();

				item = this.form.get('faculty');
				item.clearValidators();
				item.updateValueAndValidity();

				item = this.form.get('department');
				item.clearValidators();
				item.updateValueAndValidity();
			}
		});
	}

	getFaculties() {
		this.facultyService.getFaculties('*').subscribe((data: any) => {
			this.faculties = data.faculties;
		});
	}

	getModeratorDepartments() {
		this.http.get('http://localhost:8000/api/v1/universities').subscribe((res: any) => {
			if (res) {
				console.log(res);
				this.departments = new Array<Department>();

				res.data.universities.map(university => {
					university.faculties.map(faculty => {
						if (faculty.id === this.authUser.faculty.id) {
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

	onFileSelected(event) {
		let data = this.form.value;
		this.form.setValue({
			...data,
			'avatar': event.target.files[0]
		});
	}

	onSubmit(event) {
		this.isBusy = true;
		let profile = null;
		let department;

		if (this.form.get('type').value === 'Student')
			profile = new StudentProfile(this.form.get('birthdate').value, this.form.get('year').value)
		else if (this.form.get('type').value === 'TeachingStaff') {
			profile = new TeachingStaffProfile(this.form.get('birthdate').value, this.form.get('certificates').value);

			if (this.data.formName === 'Add' && this.authUser.personalData.type === 'Moderator')
				department = this.departments.find((department) => department.id === this.form.get('department').value);
		}
		else if (this.form.get('type').value === 'Company')
			profile = new CompanyProfile(this.form.get('fax').value, this.form.get('description').value, this.form.get('website').value);
		else if (this.authUser.personalData.type === 'Admin' && this.form.get('type').value === 'Moderator')
			profile = new ModeratorProfile(this.faculties.find((faculty) => faculty.id === this.form.get('faculty').value));

		let user = new User(
			this.user.id,
			this.form.get('name').value,
			this.form.get('email').value,
			this.form.get('password').value,
			true,
			this.form.get('gender').value,
			this.data.formName === 'Add' ? false : this.form.get('blocked').value,
			this.form.get('address').value,
			this.form.get('mobile').value,
			this.form.get('avatar').value,
			this.form.get('type').value,
			profile
		);

		this.onSubmitd.emit({ user, department });
	}
}