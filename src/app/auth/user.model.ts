export class User {
  role: number;
  constructor(
    public id: string = '',
    private name: string = '',
    private email: string = '',
    private type: string = '',
    private address: string = '',
    private mobile: string = '',
    private avatar: string | null,
    private verified: boolean,
    private _token: string,
    public faculty: { id: number; name: string } = null,
    public university: { id: number; name: string } = null,
    private tokenExpiration: Date
  ) {
    this.getRole();
  }
  private getRole() {
    switch (this.type) {
      case 'Student':
        this.role = 1;
        break;
      case 'TeachingStaff':
        this.role = 2;
        break;
      case 'Moderator':
        this.role = 3;
        break;
      case 'Company':
        this.role = 4;
        break;
    }
  }
  get token(): string {
    return this._token;
  }
  get personalData(): {
    address: string;
    mobile: string;
    type: string;
    email: string;
    name: string;
    avatar: string;
  } {
    return {
      address: this.address,
      mobile: this.mobile,
      type: this.type,
      email: this.email,
      name: this.name,
      avatar: this.avatar,
    };
  }

  get getEmail(): string {
    return this.email;
  }
  get isVerified(): boolean {
    return this.verified;
  }

  public get tokenExpDate(): Date {
    return this.tokenExpiration;
  }
}
