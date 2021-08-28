import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Reservation } from './reservations.model';

@Injectable({
  providedIn: 'root',
})
export class ReservationsService {
  private reservations: Reservation[] = [];
  private userReservations: Reservation[] = [];
  private roomReservations: Reservation[] = [];
  constructor(private httpClient: HttpClient) {
    this.reservations = this.getAll();
  }

  getAll() {
    this.httpClient
      .get<{ [key: string]: Reservation }>(
        'https://hotelapp-91f45-default-rtdb.firebaseio.com/reservations.json'
      )
      .subscribe((restData) => {
        const reservations = [];
        for (const key in restData) {
          if (restData.hasOwnProperty(key)) {
            reservations.push(
              new Reservation(
                key,
                restData[key].startDate,
                restData[key].endDate,
                restData[key].roomId,
                restData[key].userId,
                restData[key].roomName
              )
            );
          }
        }
        this.reservations = reservations;
      });
    return [...this.reservations];
  }

  getReservationsBy(type: string, id: string) {
    if (type === 'user') {
      this.userReservations = this.reservations.filter(
        (reservation) => reservation.userId === id
      );
      return this.userReservations;
    } else {
      this.roomReservations = this.reservations.filter(
        (reservation) => reservation.roomId === id
      );
      return this.roomReservations;
    }
  }

  addReservation(
    id: string,
    startDate: Date,
    endDate: Date,
    roomId: string,
    userId: string,
    roomName: string
  ) {
    id = Math.random().toString();
    const newReservation = new Reservation(
      id,
      startDate,
      endDate,
      roomId,
      userId,
      roomName
    );
    this.httpClient
      .post<{ name: string }>(
        'https://hotelapp-91f45-default-rtdb.firebaseio.com/reservations.json',
        {
          ...newReservation,
          id: null,
        }
      )
      .subscribe((restData) => {
        newReservation.id = restData.name;
      });
    this.reservations.push(newReservation);
  }
}
