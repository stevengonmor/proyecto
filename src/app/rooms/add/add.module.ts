import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { IonicModule } from '@ionic/angular';

import { AddPageRoutingModule } from './add-routing.module';

import { AddPage } from './add.page';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    IonicModule,
    AddPageRoutingModule,
  ],
  declarations: [AddPage],
})
export class AddPageModule {}
