export interface Time extends Document {
  start: Date | string;
  end: Date | string;
}

export interface Ticket extends Document {
  token: string;
  name: string;
  period: Time;
}
