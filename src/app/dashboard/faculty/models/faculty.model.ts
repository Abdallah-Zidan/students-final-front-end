import { University } from '../../university/models/university.model';
import { Department } from '../../department/models/department.model';

export class Faculty {
	public id: number;
	public name: string;
	public university: University;
	public departments: Array<Department>;

	constructor(id: number = 0, name: string = '', university: University = null, departments: Department[] = null) {
		this.id = id;
		this.name = name;
		this.university = university ?? new University();

		if (departments) this.departments = new Array<Department>(...departments);
	}

	toJson() {
		return {
			'id': this.id,
			'name': this.name,
			'university_id': this.university.id
		}
	}
}