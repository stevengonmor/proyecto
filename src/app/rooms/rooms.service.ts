/* eslint-disable arrow-body-style */
import { NumberSymbol } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Room } from './rooms.model';

@Injectable({
  providedIn: 'root'
})
export class RoomsService {
  private rooms: Room[] = [];
  constructor(private httpClient: HttpClient) {
  this.rooms = this.getAll();
  }
  getAll(){
    this.httpClient.get<{ [key: string]: Room }>('https://hotelapp-91f45-default-rtdb.firebaseio.com/rooms.json')
    .subscribe(
        restData => {
          const rooms = [];
          for (const key in restData){
            if(restData.hasOwnProperty(key)){
              rooms.push(new Room(
                key,
                restData[key].title,
                restData[key].ocupation,
                restData[key].status,
                restData[key].description,
                restData[key].price,
                restData[key].img,
                ));
            }
          }
          this.rooms = rooms;
        }
    );
    return [...this.rooms];
  }

  getRoom(roomsId: string){
    return {...this.rooms.find(
      room =>{
        return roomsId === room.id;
      }
    )};
  }

  addRoom(id: string, title: string, ocupation: number, status: string, description: string, price: number, img: string){
    id = Math.random().toString();
    const newRoom = new Room(id, title, ocupation, status, description, price, img);
    this.httpClient.post<{name: string}>('https://hotelapp-91f45-default-rtdb.firebaseio.com/rooms.json', {
      ...newRoom,
      id: null,
      img: 'https://estaticos-cdn.elperiodico.com/clip/690a7c8f-559f-455f-b543-41a153fe8106_alta-libre-aspect-ratio_default_0.jpg'
    }).subscribe(
      (restData) =>{
        newRoom.id = restData.name;
      }
    );
    this.rooms.push(newRoom);
   }

   editRoom(id: string, title: string, ocupation: number, status: string, description: string, price: number, img: string) {
    const newRoom = new Room(id, title, ocupation, status, description, price, img);
    this.httpClient.put<{name: string}>(`https://hotelapp-91f45-default-rtdb.firebaseio.com/rooms/${id}.json`, {
      ...newRoom,
      id: null
    }).subscribe(
      (restData) =>{
        console.log(restData);
      }
    );
  }
}
