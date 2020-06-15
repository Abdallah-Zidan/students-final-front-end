import { Component, OnInit, EventEmitter, Inject } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AuthService } from '../../../../auth/services/auth.service';
import { User as AuthUser } from '../../../../auth/user.model';
import { FacultyService } from '../../../faculty/services/faculty.service';
import { DepartmentService } from '../../services/department.service';
import { Department } from '../../models/department.model';
import { Faculty } from '../../../faculty/models/faculty.model';

@Component({
	selector: 'app-attach-dialog',
	templateUrl: './attach-dialog.component.html',
	styleUrls: ['./attach-dialog.component.scss']
})
export class AttachDialogComponent implements OnInit {
	user: AuthUser;
	form: FormGroup;
	department: Department;
	faculties: Array<Faculty>
	onSubmitd = new EventEmitter<{ department: Department, faculty: Faculty }>();
	isBusy: boolean = false;

	constructor(@Inject(MAT_DIALOG_DATA) public data: any, private authService: AuthService, private facultyService: FacultyService, private departmentService: DepartmentService) {
		this.department = data.department
	}

	ngOnInit(): void {
		this.authService.user.subscribe((user: AuthUser) => this.user = user);

		if (this.user.personalData.type === 'Admin') {
			if (this.data.formName === 'Attach')
				this.getFaculties();
			else
				this.getDepartment();
		}

		this.form = new FormGroup({
			name: new FormControl(this.department.name, [
				Validators.required
			]),
			faculty: new FormControl(null, this.user.personalData.type === 'Admin' ? [
				Validators.required
			] : [])
		});
	}

	getFaculties() {
		this.facultyService.getFaculties('*').subscribe((data: any) => {
			this.faculties = data.faculties;
		});
	}

	getDepartment() {
		this.departmentService.getDepartment(this.department.id).subscribe((data: any) => {
			this.faculties = data.department.faculties;
		});
	}

	onSubmit(event) {
		this.isBusy = true;
		let faculty;
		let department = new Department(this.department.id, this.form.get('name').value);

		if (this.user.personalData.type === 'Admin')
			faculty = this.faculties.find((faculty) => faculty.id === this.form.get('faculty').value);
		else
			faculty = null;

		this.onSubmitd.emit({ department, faculty });
	}
}