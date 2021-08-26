export interface Room {
  id: string;
  title: string;
  ocupation: number;
  status: string;
  location: string;
  description: string;
  pricePerPerson: number;
  price: number;
  img: string;
}
export class Room {
  constructor(
    public id: string,
    public title: string,
    public ocupation: number,
    public status: string,
    public location: string,
    public description: string,
    public pricePerPerson: number,
    public price: number,
    public img: string
  ) {}
}
