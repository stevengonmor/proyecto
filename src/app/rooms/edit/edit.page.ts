/* eslint-disable curly */
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Room } from '../rooms.model';
import { RoomsService } from '../rooms.service';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.page.html',
  styleUrls: ['./edit.page.scss'],
})
export class EditPage implements OnInit {
  editFrom: FormGroup;
  room: Room;
  constructor(private activatedRoute: ActivatedRoute,
    private roomsServicio: RoomsService,
    private router: Router) { }

  ngOnInit() {
    this.activatedRoute.paramMap.subscribe(
      paramMap => {
        if(!paramMap.has('roomsId')){
          return;
        }
        const roomId = paramMap.get('roomsId');
        this.room = this.roomsServicio.getRoom(roomId);
      }
    );

    this.editFrom = new FormGroup({
      id: new FormControl(this.room.id,{
        updateOn: 'blur',
        validators: [Validators.required]
      }),
      title: new FormControl(this.room.title,{
        updateOn: 'blur',
        validators: [Validators.required]
      }),
      ocupation: new FormControl(this.room.ocupation,{
        updateOn: 'blur',
        validators: [Validators.required]
      }),
      status: new FormControl(this.room.status,{
        updateOn: 'blur',
        validators: [Validators.required]
      }),
      description: new FormControl(this.room.description,{
        updateOn: 'blur',
        validators: [Validators.required,Validators.maxLength(128)]
      }),
      price: new FormControl(this.room.price,{
        updateOn: 'blur',
        validators: [Validators.required]
      }),
      img: new FormControl('https://img.bekiamascotas.com/articulos/portada/96000/96444.jpg',{
        updateOn: 'blur',
        validators: [Validators.required]
      })
    });
  }

  editFunction(){
    if(!this.editFrom.valid) return;
    this.roomsServicio.editRoom(
      this.editFrom.value.id,
      this.editFrom.value.title,
      this.editFrom.value.ocupation,
      this.editFrom.value.status,
      this.editFrom.value.description,
      this.editFrom.value.price,
      this.editFrom.value.img);
      this.router.navigate(['/rooms']);
  }
}
