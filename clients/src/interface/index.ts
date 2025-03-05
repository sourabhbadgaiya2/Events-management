export interface UserType {
  _id: String;
  name: String;
  email: String;
  role: String;
  createdAt: String;
}

export interface EventType {
  _id: string;
  name: string;
  description: string;
  organizer: string;
  guests: string[];
  address: string;
  city: string;
  pinCode: string;
  date: string;
  time: string;
  media: string[];
  ticketTypes: {
    name: string;
    price: number;
    limit: number;
    available?: number;
    booked?: number;
  }[];
}
