import { Component, OnInit } from '@angular/core';
import { Room } from './rooms.model';
import { RoomsService } from './rooms.service';

@Component({
  selector: 'app-rooms',
  templateUrl: './rooms.page.html',
  styleUrls: ['./rooms.page.scss'],
})
export class RoomsPage implements OnInit {
  rooms: Room[];
  constructor(private roomsService: RoomsService) { }

  ngOnInit() {
  }
  ionViewWillEnter(){
    this.rooms =  this.roomsService.getAll();
  }

}
