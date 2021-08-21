/* eslint-disable eol-last */
import { Component, OnInit } from '@angular/core';
import { Room } from './rooms.model';
import { RoomsService } from './rooms.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-rooms',
  templateUrl: './rooms.page.html',
  styleUrls: ['./rooms.page.scss'],
})
export class RoomsPage implements OnInit {
  rooms: Room[];
  form: FormGroup;
  display = false;
  constructor(private roomsService: RoomsService) { }

  ngOnInit() {
    this.form = new FormGroup({
      price: new FormControl(null, {
        updateOn: 'blur',
        validators: [Validators.required],
      })
    });
    setTimeout(() => {
      this.rooms =  this.roomsService.getAll();
    }, 150);
  }

  ionViewWillEnter(){
    console.log('Entro al will enter');
    setTimeout(() => {
      this.rooms =  this.roomsService.getAll();
    }, 150);
  }

  onPress(){
    this.display= !this.display;
  }

  updatePrices() {
    if (!this.form.valid) {return;}
    this.roomsService.updatePrices(this.form.value.price);
    this.display= !this.display;
  }

}
