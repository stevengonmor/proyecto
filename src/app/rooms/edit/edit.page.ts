/* eslint-disable curly */
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Room } from '../rooms.model';
import { FirestorageService } from 'src/app/service/firestorage.service';
import { RoomsService } from '../rooms.service';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.page.html',
  styleUrls: ['./edit.page.scss'],
})
export class EditPage implements OnInit {
  editFrom: FormGroup;
  room: Room;
  img = 'https://estaticos-cdn.elperiodico.com/clip/690a7c8f-559f-455f-b543-41a153fe8106_alta-libre-aspect-ratio_default_0.jpg';
  newImage = '';
  newFile = '';
  constructor(private activatedRoute: ActivatedRoute,
    private roomsServicio: RoomsService,
    private router: Router,
    public firestorageService: FirestorageService) { }

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
      })
    });
  }

  async editFunction(){
    if(!this.editFrom.valid) return;
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
    this.roomsServicio.editRoom(
      this.editFrom.value.id,
      this.editFrom.value.title,
      this.editFrom.value.ocupation,
      this.editFrom.value.status,
      this.editFrom.value.description,
      this.editFrom.value.pricePerPerson,
      this.editFrom.value.price,
      this.img);
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
