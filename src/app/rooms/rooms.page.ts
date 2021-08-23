/* eslint-disable eol-last */
import { Component, OnInit } from '@angular/core';
import { Room } from './rooms.model';
import { RoomsService } from './rooms.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { LoadingController } from '@ionic/angular';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-rooms',
  templateUrl: './rooms.page.html',
  styleUrls: ['./rooms.page.scss'],
})
export class RoomsPage implements OnInit {
  rooms: Room[];
  form: FormGroup;
  display = false;
  constructor(
    private roomsService: RoomsService,
    public loadingController: LoadingController,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {
    this.roomsService.getAll();
  }

  ngOnInit() {
    this.reloadComponent();
    this.form = new FormGroup({
      price: new FormControl(null, {
        updateOn: 'blur',
        validators: [Validators.required],
      }),
    });
    for (let i = 0; i < 3; i++) {
      this.rooms = this.roomsService.getAll();
    }

  }

  ionViewWillEnter() {
    this.reloadComponent();
    console.log('Entro al will enter');
    setTimeout(() => {
      this.rooms = this.roomsService.getAll();
    }, 500);
  }

  onPress() {
    this.display = !this.display;
  }

  updatePrices() {
    if (!this.form.valid) {
      this.router.navigate(['/rooms']);
      return;
    }
    this.roomsService.updatePrices(this.form.value.price);
    this.display = !this.display;
  }

  reloadComponent() {
    const currentUrl = this.router.url;
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    this.router.onSameUrlNavigation = 'reload';
    this.router.navigate(['/rooms']);
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
