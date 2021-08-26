import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Room } from '../../rooms.model';
import { FirestorageService } from 'src/app/service/firestorage.service';
import { ReservationsService } from '../../reservations.service';
import { User } from 'src/app/user/user.model';
import { UserService } from 'src/app/user/user.service';
import { RoomsService } from '../../rooms.service';

@Component({
  selector: 'app-add',
  templateUrl: './add.page.html',
  styleUrls: ['./add.page.scss'],
})
export class AddPage implements OnInit {
  form: FormGroup;
  room: Room;
  user: User;
  constructor(
    private activatedRoute: ActivatedRoute,
    private reservationsService: ReservationsService,
    private roomsService: RoomsService,
    private router: Router,
    public firestorageService: FirestorageService,
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
      this.form = new FormGroup({
        startDate: new FormControl(null, {
          updateOn: 'blur',
          validators: [Validators.required],
        }),
        endDate: new FormControl(null, {
          updateOn: 'blur',
          validators: [Validators.required],
        })
      });
    }
  }

  async addFunction() {
    if (!this.form.valid) {
      return;
    }
    this.reservationsService.addReservation(
      '1',
      this.form.value.startDate,
      this.form.value.endDate,
      this.room.id,
      this.user.id
    );
    this.reservationsService.getAll();
    setTimeout(() => {
      this.router.navigate(['/reservation']);
    }, 500);
  }
}
