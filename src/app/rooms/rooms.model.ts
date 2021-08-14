export interface Room{
  id: string;
  title: string;
  ocupation: number;
  description: string;
  price: number;
  img: string;
}
export class Room {
  constructor(
  public  id: string,
  public title: string,
  public ocupation: number,
  public description: string,
  public price: number,
  public img: string
  ){}
}
