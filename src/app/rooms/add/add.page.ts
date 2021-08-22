/* eslint-disable curly */
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { FirestorageService } from 'src/app/service/firestorage.service';
import { RoomsService } from '../Rooms.service';

@Component({
  selector: 'app-add',
  templateUrl: './add.page.html',
  styleUrls: ['./add.page.scss'],
})
export class AddPage implements OnInit {
  form: FormGroup;
  img =
    'https://estaticos-cdn.elperiodico.com/clip/690a7c8f-559f-455f-b543-41a153fe8106_alta-libre-aspect-ratio_default_0.jpg';
  newImage = '';
  newFile = '';
  constructor(
    private roomsService: RoomsService,
    private router: Router,
    public firestorageService: FirestorageService
  ) {}

  ngOnInit() {
    this.form = new FormGroup({
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
    });
  }
  async addFunction() {
    if (!this.form.valid) return;
    if (this.newImage !== '') {
      const path = 'roomsImg';
      const name = Math.random().toString();
      const res = await this.firestorageService.uploadImage(
        this.newFile,
        path,
        name
      );
      this.img = res;
    }
    this.roomsService.addRoom(
      '1',
      this.form.value.title,
      this.form.value.ocupation,
      this.form.value.status,
      this.form.value.description,
      this.img
    );
    this.router.navigate(['/rooms']);
  }

  async newImageUpload(event: any) {
    if (event.target.files && event.target.files[0]) {
      this.newFile = event.target.files[0];
      const reader = new FileReader();
      reader.onload = (image) => {
        this.newImage = image.target.result as string;
      };
      reader.readAsDataURL(event.target.files[0]);
    }
  }
}
