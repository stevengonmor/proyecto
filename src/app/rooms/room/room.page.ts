import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { Room } from '../rooms.model';
import { RoomsService } from '../rooms.service';

@Component({
  selector: 'app-room',
  templateUrl: './room.page.html',
  styleUrls: ['./room.page.scss'],
})
export class RoomPage implements OnInit {
  room: Room;
  constructor(private activatedRoute: ActivatedRoute,
    private roomsService: RoomsService,
    private router: Router,
    private alertCtrl: AlertController) { }

  ngOnInit() {
    this.activatedRoute.paramMap.subscribe(
      paramMap => {
        if(!paramMap.has('roomsId')){
          return;
        }
        const roomId = paramMap.get('roomsId');
        this.room = this.roomsService.getRoom(roomId);
      }
    );
  }

}
