import { Faculty } from '../../faculty/models/faculty.model';
import { Course } from '../../course/models/course.model';

export class Department {
	public id: number;
	public name: string;
	public faculties: Array<Faculty>;
	public courses: Array<Course>;

	constructor(id: number = 0, name: string = '', faculties: Faculty[] = null, courses: Course[] = null) {
		this.id = id;
		this.name = name;

		if (faculties) this.faculties = new Array<Faculty>(...faculties);
		if (courses) this.courses = new Array<Course>(...courses);
	}

	toJson() {
		return {
			'id': this.id,
			'name': this.name
		}
	}
}