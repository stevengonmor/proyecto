export interface Reservation {
  id: string;
  startDate: Date;
  endDate: Date;
  roomId: string;
  userId: string;
  roomName: string;
}
export class Reservation {
  constructor(
    public id: string,
    public startDate: Date,
    public endDate: Date,
    public roomId: string,
    public userId: string,
    public roomName: string
  ) {}
}
