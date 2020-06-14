import { Component, OnInit, EventEmitter, Inject } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { UniversityService } from '../../../university/services/university.service';
import { Faculty } from '../../models/faculty.model';
import { University } from '../../../university/models/university.model';

@Component({
	selector: 'app-create-dialog',
	templateUrl: './create-dialog.component.html',
	styleUrls: ['./create-dialog.component.scss']
})
export class CreateDialogComponent implements OnInit {
	form: FormGroup;
	faculty: Faculty;
	universities: Array<University>
	onSubmitd = new EventEmitter<Faculty>();
	isBusy: boolean = false;

	constructor(@Inject(MAT_DIALOG_DATA) public data: any, private universityService: UniversityService) {
		this.faculty = data.faculty
	}

	ngOnInit(): void {
		this.getUniversities();
		this.form = new FormGroup({
			name: new FormControl(this.faculty.name, [
				Validators.required
			]),
			university: new FormControl(this.faculty.university.id, [
				Validators.required
			])
		});
	}

	getUniversities() {
		this.universityService.getUniversities('*').subscribe((data: any) => {
			this.universities = data.universities;
		});
	}

	onSubmit(event) {
		this.isBusy = true;
		let university = this.universities.find((university) => university.id === this.form.get('university').value);
		let faculty = new Faculty(this.faculty.id, this.form.get('name').value, university);
		this.onSubmitd.emit(faculty);
	}
}