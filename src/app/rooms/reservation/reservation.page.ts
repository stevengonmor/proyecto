import { Component, OnInit } from '@angular/core';
import { Room } from '../rooms.model';
import { RoomsService } from '../rooms.service';
import { LoadingController } from '@ionic/angular';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../../user/user.service';
import { ReservationsService } from '../reservations.service';
import { Reservation } from '../reservations.model';
import { User } from '../../user/user.model';


@Component({
  selector: 'app-reservation',
  templateUrl: './reservation.page.html',
  styleUrls: ['./reservation.page.scss'],
})
export class ReservationPage implements OnInit {
  rooms: Room[];
  reservations: Reservation[];
  user: User;
  constructor(
    private reservationsService: ReservationsService,
    private roomsService: RoomsService,
    public userService: UserService,
    public loadingController: LoadingController,
    private activatedRoute: ActivatedRoute,
    private router: Router,
  ) {
  }

  ngOnInit() {
    if (this.userService.loggedUser === undefined) {
      this.router.navigate(['/user/login']);
    } else {
      this.reloadComponent();
      this.rooms = this.roomsService.getAll();
      this.user = this.userService.loggedUser;
      this.reservations = this.reservationsService.getReservationsBy('user', this.user.id);
    }
  }

  ionViewWillEnter() {
    if (this.userService.loggedUser === undefined) {
      this.router.navigate(['/user/login']);
    } else {
    this.reloadComponent();
    setTimeout(() => {
      this.rooms = this.roomsService.getAll();
      this.user = this.userService.loggedUser;
      this.reservations = this.reservationsService.getReservationsBy('user', this.user.id);
    }, 500);
    this.ngOnInit();
  }
  }

  reloadComponent() {
    const currentUrl = this.router.url;
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    this.router.onSameUrlNavigation = 'reload';
    this.router.navigate([currentUrl]);
  }

  doRefresh(event) {
    setTimeout(() => {
      this.activatedRoute.paramMap.subscribe((paramMap) => {
        setTimeout(() => {
          this.rooms = this.roomsService.getAll();
          this.user = this.userService.loggedUser;
          this.reservations = this.reservationsService.getReservationsBy('user', this.user.id);
        }, 50);
      });
      event.target.complete();
    }, 2000);
  }

}
