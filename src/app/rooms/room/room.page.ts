import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { User } from 'src/app/user/user.model';
import { UserService } from 'src/app/user/user.service';
import { Room } from '../rooms.model';
import { RoomsService } from '../rooms.service';

@Component({
  selector: 'app-room',
  templateUrl: './room.page.html',
  styleUrls: ['./room.page.scss'],
})
export class RoomPage implements OnInit {
  room: Room;
  user: User;
  constructor(
    private activatedRoute: ActivatedRoute,
    private roomsService: RoomsService,
    private router: Router,
    private alertCtrl: AlertController,
    private userService: UserService
  ) {}

  ngOnInit() {
    if (this.userService.loggedUser === undefined) {
      this.router.navigate(['/user/login']);
    } else {
      this.activatedRoute.paramMap.subscribe((paramMap) => {
        if (!paramMap.has('roomsId')) {
          return;
        }
        const roomId = paramMap.get('roomsId');
        this.room = this.roomsService.getRoom(roomId);
        this.user = this.userService.loggedUser;
      });
    }
  }
}
