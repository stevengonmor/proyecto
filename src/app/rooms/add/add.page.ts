/* eslint-disable curly */
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { RoomsService } from '../Rooms.service';

@Component({
  selector: 'app-add',
  templateUrl: './add.page.html',
  styleUrls: ['./add.page.scss'],
})
export class AddPage implements OnInit {
  form: FormGroup;
  constructor(private roomsService: RoomsService, private router: Router) {}

  ngOnInit() {
    this.form = new FormGroup({
      id: new FormControl(null, {
        updateOn: 'blur',
        validators: [Validators.required],
      }),
      title: new FormControl(null, {
        updateOn: 'blur',
        validators: [Validators.required],
      }),
      ocupation: new FormControl(null, {
        updateOn: 'blur',
        validators: [Validators.required],
      }),
      status: new FormControl(null, {
        updateOn: 'blur',
        validators: [Validators.required],
      }),
      description: new FormControl(null, {
        updateOn: 'blur',
        validators: [Validators.required, Validators.maxLength(128)],
      }),
      img: new FormControl(null, {
        updateOn: 'blur',
        validators: [Validators.required],
      }),
    });
  }
  addFunction() {
    if (!this.form.valid) return;
    this.roomsService.addRoom(
      this.form.value.id,
      this.form.value.title,
      this.form.value.ocupation,
      this.form.value.status,
      this.form.value.description,
      this.form.value.img
    );
    this.router.navigate(['/rooms']);
  }

}
