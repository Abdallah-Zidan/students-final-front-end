import { Department } from '../../department/models/department.model';

export class Course {
	public id: number;
	public name: string;
	public description: string;
	public departments: Array<Department>;

	constructor(id: number = 0, name: string = '', description: string = '', departments: Department[] = null) {
		this.id = id;
		this.name = name;
		this.description = description;

		if (departments) this.departments = new Array<Department>(...departments);
	}

	toJson() {
		return {
			'id': this.id,
			'name': this.name,
			'description': this.description
		}
	}
}