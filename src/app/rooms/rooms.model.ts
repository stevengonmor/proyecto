export interface Room{
  id: string;
  title: string;
  ocupation: number;
  status: string,
  description: string;
  price: number;
  img: string;
}
export class Room {
  constructor(
  public  id: string,
  public title: string,
  public ocupation: number,
  public status: string,
  public description: string,
  public price: number,
  public img: string
  ){}
}
