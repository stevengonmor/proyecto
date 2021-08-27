/* eslint-disable @typescript-eslint/prefer-for-of */
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Room } from '../../rooms.model';
import { FirestorageService } from 'src/app/service/firestorage.service';
import { ReservationsService } from '../../reservations.service';
import { User } from 'src/app/user/user.model';
import { UserService } from 'src/app/user/user.service';
import { RoomsService } from '../../rooms.service';
import { Reservation } from '../../reservations.model';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-add',
  templateUrl: './add.page.html',
  styleUrls: ['./add.page.scss'],
})
export class AddPage implements OnInit {
  form: FormGroup;
  room: Room;
  user: User;
  reservations: Reservation[] = [];
  constructor(
    private activatedRoute: ActivatedRoute,
    private reservationsService: ReservationsService,
    private roomsService: RoomsService,
    private router: Router,
    public firestorageService: FirestorageService,
    private userService: UserService,
    private alertController: AlertController
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
      this.form = new FormGroup({
        startDate: new FormControl(null, {
          updateOn: 'blur',
          validators: [Validators.required],
        }),
        endDate: new FormControl(null, {
          updateOn: 'blur',
          validators: [Validators.required],
        }),
      });
    }
  }

  addFunction() {
    if (!this.form.valid) {
      return;
    }
    for(let i=0;i<1;i++){
      this.reservationsService.getAll();
    }
    let count = 0;
    if (this.form.value.startDate > this.form.value.endDate) {
      this.alertController
        .create({
          header: 'Error',
          message: 'La fecha de inicio debe de ser menor que la de final',
          buttons: ['Aceptar']
        })
        .then((alertElement) => {
          alertElement.present();
        });
      return;
    }
    this.reservations = this.reservationsService.getReservationsBy(
      'room',
      this.room.id
    );
    if (!this.reservations) {
      this.reservationsService.addReservation(
        '1',
        this.form.value.startDate,
        this.form.value.endDate,
        this.room.id,
        this.user.id
      );
      setTimeout(() => {
        this.router.navigate(['/rooms/confirmation']);
      }, 500);
    } else {
      for (let i = 0; i < this.reservations.length; i++) {
        if (
          (this.form.value.startDate >= this.reservations[i].startDate &&
            this.form.value.startDate <= this.reservations[i].endDate) ||
          (this.form.value.endDate >= this.reservations[i].startDate &&
            this.form.value.endDate <= this.reservations[i].endDate) ||
          (this.reservations[i].startDate >= this.form.value.startDate &&
            this.reservations[i].endDate <= this.form.value.endDate)
        ) {
          count++;
        }
      }
    }
    if (count === 0) {
      this.reservationsService.addReservation(
        '1',
        this.form.value.startDate,
        this.form.value.endDate,
        this.room.id,
        this.user.id
      );
      setTimeout(() => {
        this.router.navigate(['/rooms/confirmation']);
      }, 500);
    } else {
      this.alertController
        .create({
          header: 'Error',
          message: 'La fecha ya ha sido reservada',
          buttons: ['Aceptar'],
        })
        .then((alertElement) => {
          alertElement.present();
        });
    }
  }
}
