/* eslint-disable arrow-body-style */
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Room } from './rooms.model';

@Injectable({
  providedIn: 'root',
})
export class RoomsService {
  pricePerPerson = 100;
  private rooms: Room[] = [];
  constructor(private httpClient: HttpClient) {
    this.rooms = this.getAll();
  }
  getAll() {
    this.httpClient
      .get<{ [key: string]: Room }>(
        'https://hotelapp-91f45-default-rtdb.firebaseio.com/rooms.json'
      )
      .subscribe((restData) => {
        const rooms = [];
        for (const key in restData) {
          if (restData.hasOwnProperty(key)) {
            rooms.push(
              new Room(
                key,
                restData[key].title,
                restData[key].ocupation,
                restData[key].status,
                restData[key].description,
                restData[key].pricePerPerson,
                restData[key].price,
                restData[key].img
              )
            );
          }
        }
        this.rooms = rooms;
      });
    return [...this.rooms];
  }

  getRoom(roomsId: string) {
    return {
      ...this.rooms.find((room) => {
        return roomsId === room.id;
      }),
    };
  }

  addRoom(
    id: string,
    title: string,
    ocupation: number,
    status: string,
    description: string,
    img: string
  ) {
    id = Math.random().toString();
    console.log(this.rooms[0]);
    if (this.rooms[0]) {
      this.pricePerPerson = this.rooms[0].pricePerPerson;
    }
    const newRoom = new Room(
      id,
      title,
      ocupation,
      status,
      description,
      this.pricePerPerson,
      this.pricePerPerson * ocupation,
      img
    );
    this.httpClient
      .post<{ name: string }>(
        'https://hotelapp-91f45-default-rtdb.firebaseio.com/rooms.json',
        {
          ...newRoom,
          id: null,
        }
      )
      .subscribe((restData) => {
        newRoom.id = restData.name;
      });
    this.rooms.push(newRoom);
  }

  editRoom(
    id: string,
    title: string,
    ocupation: number,
    status: string,
    description: string,
    pricePerPerson: number,
    price: number,
    img: string
  ) {
    const newRoom = new Room(
      id,
      title,
      ocupation,
      status,
      description,
      pricePerPerson,
      price,
      img
    );
    this.httpClient
      .put<{ name: string }>(
        `https://hotelapp-91f45-default-rtdb.firebaseio.com/rooms/${id}.json`,
        {
          ...newRoom,
          id: null,
        }
      )
      .subscribe((restData) => {
        console.log(restData);
      });
  }
  updatePrices(pricePerPerson: number) {
    this.httpClient
      .get<{ [key: string]: Room }>(
        'https://hotelapp-91f45-default-rtdb.firebaseio.com/rooms.json'
      )
      .subscribe((restData) => {
        const rooms = [];
        let newRoom = new Room(
          'temporal',
          'temporal',
          1,
          'temporal',
          'temporal',
          1,
          1,
          'temporal'
        );
        for (const key in restData) {
          if (restData.hasOwnProperty(key)) {
            rooms.push(
              (newRoom = new Room(
                key,
                restData[key].title,
                restData[key].ocupation,
                restData[key].status,
                restData[key].description,
                pricePerPerson,
                pricePerPerson * restData[key].ocupation,
                restData[key].img
              ))
            );
            this.httpClient
              .put<{ name: string }>(
                `https://hotelapp-91f45-default-rtdb.firebaseio.com/rooms/${key}.json`,
                {
                  ...newRoom,
                  id: null,
                }
              )
              .subscribe((restData2) => {
                console.log(restData2);
              });
          }
        }
        this.rooms = rooms;
      });
    this.pricePerPerson = pricePerPerson;
  }
}
