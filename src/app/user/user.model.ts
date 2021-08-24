/* eslint-disable eol-last */
export interface User {
  id: string;
  name: string;
  email: string;
  password: string;
  rol: string;
  img: string;
}
export class User {
  constructor(
  public  id: string,
  public name: string,
  public email: string,
  public password: string,
  public rol: string,
  public img: string,
  ) {}
}
