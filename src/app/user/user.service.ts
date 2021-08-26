/* eslint-disable arrow-body-style */
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { User} from './user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {
public loggedUser: User;
private users: User[] = [];
  constructor(private httpClient: HttpClient, private router: Router) {
    this.users = this.getAll();
   }

getAll(){
  this.httpClient
      .get<{ [key: string]: User }>(
        'https://hotelapp-91f45-default-rtdb.firebaseio.com/users.json'
      )
      .subscribe((restData) => {
        const users = [];
        for (const key in restData) {
          if (restData.hasOwnProperty(key)) {
            users.push(
              new User(
                key,
                restData[key].name,
                restData[key].email,
                restData[key].password,
                restData[key].rol,
                restData[key].img
              )
            );
          }
        }
        this.users = users;
      });
    return [...this.users];
}

getUser(userId: string) {
  return {
    ...this.users.find((user) => {
      return userId === user.id;
    }),
  };
}

registerUser(id: string, name: string, email: string, password: string, rol: string, img: string){
  id = Math.random().toString();
  const newUser = new User(
    id,
    name,
    email,
    password,
    rol,
    img
  );
  this.httpClient
    .post<{ name: string }>(
      'https://hotelapp-91f45-default-rtdb.firebaseio.com/users.json',
      {
        ...newUser,
        id: null,
      }
    )
    .subscribe((restData) => {
      newUser.id = restData.name;
    });
  this.users.push(newUser);
}

logIn(email: string, password: string){
  for(let i = 0; i<=1; i++){
    this.getAll();
  }
  this.loggedUser = this.users.find(
    (user) => {
      return user.email === email && user.password === password;
    }
  );
  return {...this.loggedUser};
}

logOut(){
  this.loggedUser = undefined;
}

}
