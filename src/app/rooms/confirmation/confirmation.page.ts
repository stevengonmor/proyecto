import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RoomsService } from '../Rooms.service';

@Component({
  selector: 'app-confirmation',
  templateUrl: './confirmation.page.html',
  styleUrls: ['./confirmation.page.scss'],
})
export class ConfirmationPage implements OnInit {

  constructor(private router: Router, private roomsService: RoomsService) { }

  ngOnInit() {
    setTimeout(() => {
      this.roomsService.getAll();
      this.router.navigate(['../']);
    }, 3000);
  }

}
