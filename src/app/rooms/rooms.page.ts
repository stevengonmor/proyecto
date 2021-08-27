/* eslint-disable eol-last */
import { Component, OnInit } from '@angular/core';
import { Room } from './rooms.model';
import { RoomsService } from './rooms.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { LoadingController } from '@ionic/angular';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../user/user.service';
import { User } from '../user/user.model';

@Component({
  selector: 'app-rooms',
  templateUrl: './rooms.page.html',
  styleUrls: ['./rooms.page.scss'],
})
export class RoomsPage implements OnInit {
  rooms: Room[];
  activeRooms: Room[];
  form: FormGroup;
  user: User;
  display = false;
  constructor(
    private roomsService: RoomsService,
    public userService: UserService,
    public loadingController: LoadingController,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {
  }

  ngOnInit() {
    if (this.userService.loggedUser === undefined) {
      this.router.navigate(['/user/login']);
    } else {
      this.reloadComponent();
      this.form = new FormGroup({
        price: new FormControl(null, {
          updateOn: 'blur',
          validators: [Validators.required],
        }),
      });
        this.rooms = this.roomsService.getAll();
        this.activeRooms = this.roomsService.getActiveRooms();
        this.user = this.userService.loggedUser;
    }
  }

  ionViewWillEnter() {
    if (this.userService.loggedUser === undefined) {
      this.router.navigate(['/user/login']);
    } else {
    this.reloadComponent();
    setTimeout(() => {
      this.rooms = this.roomsService.getAll();
      this.activeRooms = this.roomsService.getActiveRooms();
      this.user = this.userService.loggedUser;
    }, 500);
    this.ngOnInit();
  }
  }

  onPress() {
    this.display = !this.display;
  }

  updatePrices() {
    if (!this.form.valid) {
      return;
    }
    this.roomsService.updatePrices(this.form.value.price);
    this.display = !this.display;
    this.router.navigate(['/rooms/confirmation']);
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
        }, 50);
      });
      event.target.complete();
    }, 2000);
  }
}
