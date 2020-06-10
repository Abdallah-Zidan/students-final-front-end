export class Attachment {
  constructor(
    public id: string,
    public url: string,
    public mime: string,
    public name: string = ''
  ) {}
}
