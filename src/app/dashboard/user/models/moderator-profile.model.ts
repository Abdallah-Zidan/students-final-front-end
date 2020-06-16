import { Faculty } from '../../faculty/models/faculty.model';

export class ModeratorProfile {
	public faculty: Faculty;

	constructor(faculty: Faculty = null) {
		this.faculty = faculty;
	}

	toJson() {
		return {
			'faculty_id': this.faculty.id
		}
	}
}