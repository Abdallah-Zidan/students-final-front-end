export class Message {
  constructor(
    public id: number,
    public text: string,
    public from: { id: string; avatar: string; name: string },
    public to: { id: string; avatar: string; name: string },
    public created_at: any,
    public created_at_human: any
  ) {
    this.id = id;
    this.text = text;
    this.from = from;
    this.to = to;
    this.created_at = created_at;
    this.created_at_human = created_at_human;
  }
}
