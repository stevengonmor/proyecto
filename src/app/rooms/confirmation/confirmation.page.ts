import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/user/user.model';
import { UserService } from 'src/app/user/user.service';
import { ReservationsService } from '../reservations.service';
import { RoomsService } from '../Rooms.service';

@Component({
  selector: 'app-confirmation',
  templateUrl: './confirmation.page.html',
  styleUrls: ['./confirmation.page.scss'],
})
export class ConfirmationPage implements OnInit {
  user: User;
  constructor(private router: Router,
    private roomsService: RoomsService,
    private reservationsService: ReservationsService,
    private userService: UserService) {
  }

  ngOnInit() {
    setTimeout(() => {
      this.reservationsService.getAll();
      this.user = this.userService.loggedUser;
      this.reservationsService.getReservationsBy('user',this.user.id);
      this.roomsService.getAll();
      this.router.navigate(['../']);
    }, 3000);
  }

}
