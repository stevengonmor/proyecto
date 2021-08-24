import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController, NavController } from '@ionic/angular';
import { RoomsService } from 'src/app/rooms/rooms.service';
import { FirestorageService } from 'src/app/service/firestorage.service';
import { User } from '../user.model';
import { UserService } from '../user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  form: FormGroup;
  user: User;
  constructor(
    private userService: UserService,
    private roomsService: RoomsService,
    private router: Router,
    public firestorageService: FirestorageService,
    private alert: AlertController,
    private nav: NavController
  ) {}

  ngOnInit() {
    this.form = new FormGroup({
      email: new FormControl(null, {
        updateOn: 'blur',
        validators: [Validators.required, Validators.email],
      }),
      password: new FormControl(null, {
        updateOn: 'blur',
        validators: [Validators.required],
      })
    });
  }

  logIn(){
    if(!this.form.valid) {return;}
    this.user = this.userService.logIn(this.form.value.email, this.form.value.password);
    if(!this.user){
      this.alert.create({
        header: 'Cuidado',
        message: 'Credenciales incorrectas',
        buttons: [{
          text: 'Ok',
          role: 'cancel'
        }]
      }).then(
        alert => {
          alert.present();
        }
      );
    } else{
      this.roomsService.getAll();
    setTimeout(() => {
      this.router.navigate(['/rooms/confirmation']); //check
    }, 500);
    }
  }

}
