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

}
