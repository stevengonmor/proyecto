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
          const productos = [];
          for (const key in restData){
            if(restData.hasOwnProperty(key)){
              productos.push(new Room(
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
          this.rooms = productos;
        }
    );
    return [...this.rooms];
  }

}
