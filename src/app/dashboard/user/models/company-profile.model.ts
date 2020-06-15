export class CompanyProfile {
	public fax: string;
	public description: string;
	public website: string;

	constructor(fax: string = '', description: string = '', website: string = '') {
		this.fax = fax;
		this.description = description;
		this.website = website;
	}

	toJson() {
		return {
			'fax': this.fax,
			'description': this.description,
			'website': this.website
		}
	}
}