import { User } from '../../user/models/user.model';

export class Post {
	public id: number;
	public body: string;
	public reported: boolean;
	public year: number;
	public user: User;
	public scope: string;
	public created_at: string;

	constructor(id: number = 0, body: string = '', reported: boolean = false, year: number = 0, user: User = null, scope: string = '', created_at: string = '') {
		this.id = id;
		this.body = body;
		this.reported = reported;
		this.year = year;
		this.user = user;
		this.scope = scope;
		this.created_at = created_at;
	}

	toJson() {
		return {
			'reported': this.reported
		}
	}
}