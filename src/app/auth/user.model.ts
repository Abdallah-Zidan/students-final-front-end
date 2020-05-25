export class User {
  constructor(
    public id: string = '',
    private name: string = '',
    private email: string = '',
    private type: string = '',
    private address: string = '',
    private mobile: string = '',
    private avatar: string | null,
    private verified: boolean,
    private _token: string
  ) {}

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
}
