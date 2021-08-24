/* eslint-disable curly */
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { FirestorageService } from 'src/app/service/firestorage.service';
import { UserService } from '../user.service';

@Component({
  selector: 'app-add',
  templateUrl: './add.page.html',
  styleUrls: ['./add.page.scss'],
})
export class AddPage implements OnInit {
  form: FormGroup;
  img =
    'https://upload.wikimedia.org/wikipedia/commons/thumb/1/12/User_icon_2.svg/768px-User_icon_2.svg.png';
  newImage = '';
  newFile = '';
  constructor(
    private userService: UserService,
    private router: Router,
    public firestorageService: FirestorageService
  ) {}

  ngOnInit() {
    this.form = new FormGroup({
      name: new FormControl(null, {
        updateOn: 'blur',
        validators: [Validators.required],
      }),
      email: new FormControl(null, {
        updateOn: 'blur',
        validators: [Validators.required, Validators.email],
      }),
      password: new FormControl(null, {
        updateOn: 'blur',
        validators: [Validators.required],
      }),
      rol: new FormControl(null, {
        updateOn: 'blur',
        validators: [Validators.required],
      }),
    });
  }
  async registerFunction() {
    if (!this.form.valid) return;
    if (this.newImage !== '') {
      const path = 'userImg';
      const name = Math.random().toString();
      const res = await this.firestorageService.uploadImage(
        this.newFile,
        path,
        name
      );
      this.img = res;
    }
    this.userService.registerUser(
      '1',
      this.form.value.name,
      this.form.value.email,
      this.form.value.password,
      this.form.value.rol,
      this.img
    );
    this.userService.getAll();
    setTimeout(() => {
      this.router.navigate(['/rooms/confirmation']); //check
    }, 500);
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
